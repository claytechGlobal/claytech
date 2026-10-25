import { scheduleLead } from "../lib/schedule.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }
  let data = req.body;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data || "{}");
    } catch {
      data = null;
    }
  }
  if (!data) {
    res.status(400).json({ ok: false, error: "That request could not be read." });
    return;
  }
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "local").split(",")[0].trim();
  try {
    const result = await scheduleLead(data, ip);
    res.status(result.status).json(result.body);
  } catch {
    res.status(500).json({ ok: false, error: "The server could not send that request." });
  }
}
