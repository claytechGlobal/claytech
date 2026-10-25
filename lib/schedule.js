const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clip(value, max) {
  return String(value || "").trim().slice(0, max);
}

export async function scheduleLead(data, ip) {
  if (limited(ip || "local")) {
    return { status: 429, body: { ok: false, error: "Too many requests. Wait a few minutes and try again." } };
  }
  if (!data || typeof data !== "object") {
    return { status: 400, body: { ok: false, error: "That request could not be read." } };
  }
  if (clip(data.company_website, 200)) {
    return { status: 200, body: { ok: true } };
  }
  const name = clip(data.name, 120);
  const email = clip(data.email, 180);
  const phone = clip(data.phone, 40);
  const business = clip(data.business, 160);
  const focus = clip(data.focus, 80);
  const message = clip(data.message, 2000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { ok: false, error: "Add a name and a valid email." } };
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO;
  const from = process.env.RESEND_FROM || "Claytech Global <onboarding@resend.com>";
  if (!key || !to) {
    return {
      status: 503,
      body: {
        ok: false,
        error: "The form is not connected yet. Add RESEND_API_KEY and RESEND_TO in the project environment."
      }
    };
  }
  const text = [
    "New training request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Business: ${business || "—"}`,
    `Focus: ${focus || "—"}`,
    "",
    message || "No extra note."
  ].join("\n");
  const upstream = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Training request from ${name}`,
      text
    })
  });
  if (!upstream.ok) {
    return {
      status: 502,
      body: { ok: false, error: "The email service did not accept the request. Check the Resend key, the from address, and the inbox you send to." }
    };
  }
  return { status: 200, body: { ok: true } };
}
