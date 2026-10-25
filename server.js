import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scheduleLead } from "./lib/schedule.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] == null || process.env[key] === "") process.env[key] = value;
  }
}

loadEnv(path.join(root, ".env"));

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20000) {
        reject(new Error("too-large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch {
        reject(new Error("bad-json"));
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

async function schedule(req, res) {
  let data;
  try {
    data = await readBody(req);
  } catch {
    send(res, 400, { ok: false, error: "That request could not be read." });
    return;
  }
  const result = await scheduleLead(data, req.socket.remoteAddress || "local");
  send(res, result.status, result.body);
}

function serveFile(req, res) {
  const url = new URL(req.url, "http://localhost");
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  const file = path.resolve(root, `.${pathname}`);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
  const base = path.basename(file);
  if ((!file.startsWith(rootWithSep) && file !== root) || base.startsWith(".")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && new URL(req.url, "http://localhost").pathname === "/api/schedule") {
    schedule(req, res).catch(() => {
      if (!res.headersSent) send(res, 500, { ok: false, error: "The server could not send that request." });
    });
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    serveFile(req, res);
    return;
  }
  res.writeHead(405);
  res.end("Method not allowed");
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => {
  console.log(`Claytech running at http://localhost:${port}`);
});
