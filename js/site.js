(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  const nav = document.querySelector(".nav-wrap");
  const menu = document.querySelector(".nav-menu");
  const hero = document.querySelector(".hero");

  function paintNav() {
    if (!nav || !hero) return;
    const solid = hero.getBoundingClientRect().bottom < 80;
    nav.classList.toggle("solid", solid);
  }
  paintNav();
  window.addEventListener("scroll", paintNav, { passive: true });

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      menu.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  const scripts = [
    {
      id: "sales",
      label: "Sales follow-up",
      beats: [
        { kind: "in", text: "I asked about working together and never heard back." },
        { kind: "type" },
        { kind: "out", text: "I have that here. I can send the details, or set a call for tomorrow at 9:40." },
        { kind: "in", text: "Tomorrow at 9:40 works." },
        { kind: "type" },
        { kind: "ok", text: "Follow-up set · tomorrow 9:40" }
      ]
    },
    {
      id: "appointments",
      label: "Appointment setting",
      beats: [
        { kind: "in", text: "Can someone come by this week?" },
        { kind: "type" },
        { kind: "slot", time: "Thu 9:40", meta: "Offered" },
        { kind: "type" },
        { kind: "slot", time: "Thu 9:40", meta: "Confirmation sent", refresh: true },
        { kind: "slot", time: "Fri 1:30", meta: "Reminder queued" },
        { kind: "ok", text: "Calendar updated · reminders on" }
      ]
    },
    {
      id: "marketing",
      label: "SMS and email",
      beats: [
        { kind: "chip", text: "SMS · new lead, just now" },
        { kind: "type" },
        { kind: "out", text: "Following up on your note. I can send the details or hold a time." },
        { kind: "chip", text: "Email · day 3, if there is no reply" },
        { kind: "chip", text: "SMS · one last nudge" },
        { kind: "ok", text: "Nurture running" }
      ]
    },
    {
      id: "invoices",
      label: "Invoices",
      beats: [
        { kind: "card", id: "inv", kicker: "Invoice 1842", title: "Open", note: "Connected billing tool" },
        { kind: "type" },
        { kind: "update", id: "inv", kicker: "Invoice 1842", title: "Sending reminder", note: "Connected billing tool" },
        { kind: "type" },
        { kind: "update", id: "inv", kicker: "Invoice 1842", title: "Reminder sent", note: "Delivered just now" },
        { kind: "ok", text: "Payment reminder delivered" }
      ]
    },
    {
      id: "questions",
      label: "Customer questions",
      beats: [
        { kind: "in", text: "What do I need to send before we start?" },
        { kind: "type" },
        { kind: "out", text: "The form covers it. I can send that now, and answer the usual questions from there." },
        { kind: "in", text: "Please send it." },
        { kind: "type" },
        { kind: "ok", text: "Answer sent · form on the way" }
      ]
    },
    {
      id: "onboarding",
      label: "Onboarding",
      beats: [
        { kind: "check", id: "c1", text: "Collecting details" },
        { kind: "tick", id: "c1", text: "Details collected" },
        { kind: "check", id: "c2", text: "Sending the form" },
        { kind: "tick", id: "c2", text: "Form sent" },
        { kind: "check", id: "c3", text: "Lining up the next step" },
        { kind: "tick", id: "c3", text: "Next step assigned" },
        { kind: "ok", text: "Onboarding in motion" }
      ]
    },
    {
      id: "retention",
      label: "Client retention",
      beats: [
        { kind: "out", text: "It has been a while since the last check-in. I can hold a time next week." },
        { kind: "type" },
        { kind: "in", text: "Next week is fine." },
        { kind: "type" },
        { kind: "slot", time: "Tue 10:00", meta: "Check-in held" },
        { kind: "ok", text: "Re-engagement booked" }
      ]
    }
  ];

  const feed = document.getElementById("phone-feed");
  const phoneLabel = document.getElementById("phone-label");
  const items = [...document.querySelectorAll(".agent-item")];
  let generation = 0;
  let playTimer = 0;
  const wait = (ms, token) => new Promise((resolve) => {
    playTimer = window.setTimeout(() => resolve(token === generation), ms);
  });

  function node(className) {
    const el = document.createElement("div");
    el.className = className;
    return el;
  }

  function place(el) {
    feed.appendChild(el);
    feed.scrollTo({ top: feed.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }

  function showBeat(beat) {
    if (beat.kind === "in" || beat.kind === "out") {
      const el = node(`msg ${beat.kind}`);
      el.textContent = beat.text;
      place(el);
      return;
    }
    if (beat.kind === "ok") {
      const el = node("scene-ok");
      el.textContent = beat.text;
      place(el);
      return;
    }
    if (beat.kind === "chip") {
      const el = node("chip");
      el.textContent = beat.text;
      place(el);
      return;
    }
    if (beat.kind === "card") {
      const el = node("bill");
      el.dataset.id = beat.id;
      const kicker = document.createElement("span");
      const title = document.createElement("strong");
      const note = document.createElement("em");
      kicker.textContent = beat.kicker;
      title.textContent = beat.title;
      note.textContent = beat.note;
      el.append(kicker, title, note);
      place(el);
      return;
    }
    if (beat.kind === "update") {
      const el = feed.querySelector(`[data-id="${beat.id}"]`);
      if (!el) return;
      el.querySelector("span").textContent = beat.kicker;
      el.querySelector("strong").textContent = beat.title;
      el.querySelector("em").textContent = beat.note;
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
      return;
    }
    if (beat.kind === "slot") {
      let el = beat.refresh ? feed.querySelector(".slot") : null;
      if (!el) {
        el = node("slot");
        const time = document.createElement("b");
        const meta = document.createElement("span");
        el.append(time, meta);
        place(el);
      }
      el.querySelector("b").textContent = beat.time;
      el.querySelector("span").textContent = beat.meta;
      return;
    }
    if (beat.kind === "check" || beat.kind === "tick") {
      let el = feed.querySelector(`[data-id="${beat.id}"]`);
      if (!el) {
        el = node("check-row");
        el.dataset.id = beat.id;
        const label = document.createElement("b");
        el.append(label);
        place(el);
      }
      el.querySelector("b").textContent = beat.text;
      el.classList.toggle("done", beat.kind === "tick");
    }
  }

  function runLength(beats) {
    return beats.reduce((sum, beat) => sum + (beat.kind === "type" ? 720 : 860), 700);
  }

  async function play(index) {
    const script = scripts[index];
    if (!script || !feed) return;
    const token = ++generation;
    window.clearTimeout(playTimer);
    items.forEach((el) => el.classList.remove("on"));
    const button = items.find((el) => el.dataset.agent === script.id);
    if (button) {
      button.style.setProperty("--run", `${runLength(script.beats)}ms`);
      void button.offsetWidth;
      button.classList.add("on");
    }
    if (phoneLabel) phoneLabel.textContent = script.label;
    feed.classList.add("swap");
    await wait(reduce ? 0 : 220, token);
    if (token !== generation) return;
    feed.replaceChildren();
    feed.classList.remove("swap");
    for (const beat of script.beats) {
      if (token !== generation) return;
      if (beat.kind === "type") {
        if (reduce) continue;
        const typing = node("typing");
        typing.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
        place(typing);
        const alive = await wait(720, token);
        typing.remove();
        if (!alive || token !== generation) return;
        continue;
      }
      showBeat(beat);
      if (reduce) continue;
      const alive = await wait(860, token);
      if (!alive || token !== generation) return;
    }
    if (reduce || token !== generation) return;
    const alive = await wait(1100, token);
    if (!alive || token !== generation) return;
    play((index + 1) % scripts.length);
  }

  items.forEach((el, index) => {
    el.addEventListener("click", () => play(index));
  });

  const stage = document.getElementById("agents");
  if (stage && feed) {
    if (reduce || !("IntersectionObserver" in window)) {
      play(0);
    } else {
      const boot = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        boot.disconnect();
        play(0);
      }, { threshold: 0, rootMargin: "0px 0px -15% 0px" });
      boot.observe(stage);
    }
  }

  const clock = document.querySelector("[data-clock]");
  function paintClock() {
    if (!clock) return;
    clock.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    clock.setAttribute("datetime", new Date().toISOString());
  }
  paintClock();
  window.setInterval(paintClock, 30000);

  const form = document.getElementById("schedule-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.textContent = "";
      const data = Object.fromEntries(new FormData(form));
      if (!String(data.name || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || "").trim())) {
        status.textContent = "Add your name and a valid email.";
        return;
      }
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      try {
        const res = await fetch("/api/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) {
          status.textContent = json.error || "Something went wrong. Try again.";
          return;
        }
        form.reset();
        status.textContent = "Request sent. We'll reply by email with a time for your training.";
      } catch {
        status.textContent = "Could not reach the server. Try again in a moment.";
      } finally {
        button.disabled = false;
      }
    });
  }
})();
