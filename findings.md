# Claytech landing page — reference findings

No page code yet. This file is the build brief.

Design reference: [griffain.io](https://www.griffain.io/)
Animation reference: [Facebook reel](https://www.facebook.com/share/r/1Babv1LwYB/?mibextid=wwXIfr)
Copy source: Claytech Global landing page outline (in the project chat).

Checked live in the browser on 25 Oct 2026. Values below are computed from the live homepage, not guessed.

---

## What to build with

Use **HTML + CSS + a small amount of JavaScript**. One `index.html`, one stylesheet, one or two scripts.

That is the stack Griffain actually ships. The homepage is not React, Next.js, Vue, or Webflow. There is no GSAP, Three.js, Lottie, Framer Motion, or Lenis. Motion is custom WebGL on `<canvas>`, CSS keyframes, and `IntersectionObserver`.

This fits Claytech because the page is one screen of fixed copy, a logo row, proof, and a button that leaves the site for a scheduling calendar. A framework does not help that page.

Later, if the site grows into a blog or many pages, the same sections can move into Astro. Do not start there.

The button `Schedule My Free Training` is a normal link to the calendar URL. No form on this page.

---

## Griffain — what the page is

Title: “GRIFFAIN — AI Infrastructure That Turns Traffic Into Revenue”.

It is a long sales page. The job of every block is to get a “Book a Call” click. Product proof sits in the middle as fake product UI (chat threads, calendars, ad cards), not as a dashboard login.

### Page order (copy this order, swap in Claytech copy)

1. **Hero** — full-bleed color, giant name, one sentence, two pills.
2. **Logo marquee** — “Businesses running on GRIFFAIN”, logos sliding forever.
3. **Speed proof** (`#speed`) — “Proven to answer every lead in under 60 seconds”, three promises, then quote cards.
4. **AI staff** (`#ai-staff`) — “AI staff that never clock out.” Three live-looking product screens: receptionist call, speed-to-lead text, setter calendar. Arrow + dots.
5. **Integrations** — one line: “Works with the tools you already use.” App tiles for payments, phones, calendars, contracts.
6. **Use cases** (`#usecase`) — “Choose Your Use Case”. Cards for trades, home services, clinics, coaches, e-commerce. Each card has a quote, a name, and a small fact (“72-hour install”).
7. **Founder line** — one quote, initials, name, title.
8. **System 01, sticky chapter** — “Your leads go cold in minutes.” Steps stick while the picture changes: Respond, Qualify, Book, Integrate, Report.
9. **System 02** (`#websites`) — “A website that behaves like your best salesman.” Sticky steps: Design, Write, Launch, Own.
10. **System 03** — “Know what a booked job costs you.” Sticky steps: Launch, Track, Optimize, Scale.
11. **Results** (`#results`) — “Built for speed. Because speed works.” Star reviews, client, role, and a stat chip (`<60s`, `72h`, `60 sec`).
12. **Logo repeat** — “You book more. Period.”
13. **Close** — “Start with speed.” Two buttons: Book a Call Now, Run the Free Diagnostic.
14. **Footer** — light, tall, link columns.

Nav sits on top of the hero, not in a white bar. Links: Systems (mega menu), Results, Pricing, Blog, Agencies, Login, and the blue pill “Book a Call Now”.

Systems menu items, each with a one-line description:

- Pay-Per-Lead — Exclusive leads, one at a time
- Never-Miss-A-Lead — Every lead answered in 60 seconds
- Conversion Websites — Sites built to book jobs
- The Demand Engine — Ads, creative and daily posting
- The Front Desk — Answers every call, day or night
- Found-First — Own your county's search
- Custom Software — Built for you in two weeks
- The Webinar Engine — Webinars for coaches & consultants
- Try the live demo — Watch it answer your customers — free

Claytech does not need this mega menu on v1. Keep a thin nav: logo, one text link if needed, and `Schedule My Free Training`.

### What each surface is showing

| Surface | What the visitor sees |
|---|---|
| Hero | Wordmark, one promise, primary pill + glass secondary pill. Moving color field and a glowing globe behind the type. |
| Logo strip | Grayscale-style client marks, endless horizontal loop, edges faded. |
| Speed | Three short outcomes, then long testimonials with business name and city. |
| AI staff | Phone/chat UI that types itself. Bubbles appear one by one. A checkmark lands when the job is booked. |
| Use cases | Industry cards. Quote is the proof. “Learn more” is secondary. |
| Sticky systems | Left: short step name + 2-line explanation. Right: a picture of that step (text thread, calendar, checklist, ad card). The block stays pinned while you scroll through the steps. |
| Results | Five stars, long quote, person, role, sometimes a site link, sometimes a big stat. |
| Close | Short headline, subline, two pills. |

Scripts loaded from `/assets/` (besides analytics): `brand.js`, `features.js`, `hero-shader.js`, `staff.js`, `globe.js`, `motion.js`, `chat-widget.js`, `promo.js`, `footer.js`, `vsl.js`, `proof.js`. Stylesheet: `/assets/styles.css`. Fonts from Google Fonts.

---

## Color

Body background is white `rgb(255, 255, 255)`. Body text is black. The hero is the only large color field.

| Token | Value | Where it is used |
|---|---|---|
| `--hero-base` | `#5150F7` | Hero background. Also the WebGL fallback if the shader cannot start. |
| `--ink` | `#000` | Headlines and body on white. |
| `--ink-2` | `#333` | Secondary text. |
| `--grey` | `#949494` | Muted labels. |
| `--grey-2` | `#666` | Slightly stronger muted text. |
| `--paper` | `#fff` | Cards and page. |
| `--soft` | `#F9F9F9` | Results section background. |
| `--dark` | `#000` | Dark pills and dark UI. |
| `--dark-card` | `#121212` | Dark product cards. |
| `--accent` | `#0066FF` | Links after the nav turns solid. Blue pills. |
| `--accent-hover` | `#0052D4` | Blue hover. |
| `--cobalt-deep` | `#1E3FD0` | Left/mid stop of the brand gradient. |
| `--indigo` | `#2A1A6E` | Darkest stop of the brand gradient. |
| `--teal` | `#0AA2D8` | Mid-light stop. |
| `--cyan` | `#3AD0E6` | Lightest stop. Nav link hover on the hero is `rgb(155, 232, 245)`. |
| `--green` | `#6CB14D` | Success marks. |
| `--green-text` | `#4EA321` | Success text. |
| Extra stops used in small UI | `#8B5CF6`, `#EC4899` | Dots and small charts, with cyan and blue. |
| Footer background | `rgb(253, 253, 255)` | Barely off-white. |

Brand gradient, used on the nav “Book a Call Now” pill:

`linear-gradient(108deg, #2A1A6E 0%, #1E3FD0 26%, #0066FF 50%, #0AA2D8 77%, #3AD0E6 100%)`

Text gradient (for highlighted words):

`linear-gradient(135deg, #3AD0E6 0%, #0066FF 50%, #1E3FD0 100%)`

Blue pill shadow: `rgba(24, 140, 240, 0.42) 0 10px 30px`, plus a 1px white inset highlight at 30% opacity. Nav pill uses a tighter shadow, `rgba(24, 140, 240, 0.4) 0 6px 20px`.

Hero type is white. Subheadline is white at 92% opacity.

For Claytech, keep these roles (one saturated hero, white page, black type, one blue action, one green “done” state). The violet `#5150F7` is Griffain’s brand. If Claytech has its own brand color, put that in `--hero-base` and shift the gradient’s hue the same way their shader does (`data-hue`). Do not invent a second palette of random colors.

---

## Type

Loaded from Google Fonts:

`Literata` (optical size 7–72, weight 400–600, italic too), `Inter` (400, 500, 600, 700, 900), `Poppins` (800, 900), `IBM Plex Sans` (600, 700), `Source Serif 4` (optical size 8–60, weight 600).

What is actually on screen:

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero H1 “GRIFFAIN” | Literata, then Georgia | 110px | 400 | White. Letter-spacing 1px. Line-height 132px. |
| Hero subheadline | Inter | 20px | 500 | White at 92%. |
| Section H2 | Literata | 42px, sometimes 36px or 46px on the close | 400 | Black. The AI-staff line is about 37px. |
| Integration headline | Inter | ~27px | 700 | The only bold sans section title. |
| Body | Inter | 16px | 400 | Black. |
| Nav links | Inter | 15px | 500 | White on the hero. |
| Wordmark in nav | Inter-like, 17px | 17px | — | White, next to an SVG mark. |
| Pills | Inter | 16px | 500 | Nav pill is 14px / 600. |
| Small pill | Inter | 14px | 500 | Height 38px. |

CSS variables:

- `--serif: "Literata", "P22 Mackinac", Georgia, serif`
- `--sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

Headlines are a serif at regular weight, not a bold sans. Body and buttons are Inter. That contrast is the look. Poppins and IBM Plex are loaded for smaller UI bits; do not use them for the hero.

Content width: `--w-content: 1160px`. Wider panels: `--w-panel: 1224px`.

Radius: cards `16px`, large panels `24px`, every button `999px` (full pill).

Nav: `position: absolute; top: 0; z-index: 50; padding: 28px 40px`. Link gap `32px`. After the hero, `.nav-solid` switches the bar to white and the links to black. Hero link hover is the pale cyan. Solid-nav hover is `#0066FF`.

---

## Buttons

Class `.pill`: height 44px, padding `0 24px`, radius 999px, 16px / 500, gap 8px.

Motion: hover `translateY(-1px)` in 0.18s. Press `translateY(0) scale(0.98)` in 0.18s.

Variants to copy:

- `.pill-white` — white fill, black text. Primary on the violet hero.
- `.pill-glass` — `rgba(255,255,255,0.15)`, white text, `backdrop-filter: blur(6px)`. Hover raises the fill to 25%. This is the secondary “How It Works”.
- `.pill-blue` / `.grad-blue` — brand gradient, white text, blue glow shadow. This is the nav CTA and the CTA on white sections.
- `.pill-dark` — black fill, white text.
- `.pill-ghost` — white fill, 1px inset ring `rgba(0,0,0,0.16)`, ring darkens on hover.

Claytech primary label: **Schedule My Free Training**. Secondary, if we keep one: a glass or ghost pill such as “See how it works”, scrolling to the agent list. Both calendar buttons (top and bottom) use the same label and the same calendar URL.

---

## Motion on Griffain (exact)

There are 37 CSS keyframe animations. The ones that matter:

### 1. Hero color field — WebGL, not a video

`hero-shader.js` draws on `<canvas class="hero-canvas" id="hero-canvas">` (about 1554×1368). WebGL, no antialias, no alpha. A fullscreen triangle runs a fragment shader:

- uniforms: resolution, time, mouse, hue
- simplex-style value noise
- `hueShift` rotates the whole palette around the grey axis so other pages can recolor the same galaxy with `data-hue`
- loop via `requestAnimationFrame`
- if WebGL is missing, the canvas is painted `#5150F7`

This is the “living background”. It is a 2D shader, not a 3D model.

### 2. Globe — second WebGL canvas

`globe.js` on `#globe-canvas`, plus a glow overlay `#globe-fx`. Alpha on, antialias on. A sphere sits in the middle of a larger canvas so the atmosphere can fade to zero before the edge. Their comment calls that headroom `K = 1.28`. The shader takes time, rotation, and tilt. Color is a cosine palette. It only works while the block is in view (`IntersectionObserver`).

Claytech can use this pattern as a soft glowing orb behind the headline. It should not fight the headline. Griffain’s type sits in front, `overflow: hidden` on `.hero`.

### 3. Scroll reveal

`.reveal` starts at `opacity: 0` and `translateY(26px)`.

`.reveal.in` goes to `opacity: 1` and no transform.

Transition: `0.7s cubic-bezier(0.2, 0.65, 0.3, 1)` on both opacity and transform.

`motion.js` uses `IntersectionObserver` with `threshold: 0` and `rootMargin: "0px 0px -12% 0px"`. Once it has shown, it stops watching that element. If the browser has no observer, everything is shown immediately. A timeout also forces leftovers visible so content cannot stay invisible.

`@keyframes riseIn` is the smaller version: from `opacity: 0; translateY(18px)` to visible. Use this on the hero words.

### 4. Logo marquee

`.lgm` hides overflow and masks the edges: transparent, black from 9% to 91%, transparent.

`.lgm-track` is a flex row, gap 64px, `width: max-content`, animation `lgmMove` 30s linear infinite.

`lgmMove` goes from `translate(-50%)` to `translate(0)`. The logo list is duplicated so the loop has no seam. 22 logo images are in the strip. Below  the motion is CSS only.

### 5. Sticky chapters

Three `.pin-section` blocks. Inner `.pin-wrap` is `position: sticky; top: 6vh`.

Step counts: 5 (lead system), 4 (website), 4 (ads). Each step is an `.acc-item` with a matching scene in `.fc-visual`. On desktop the picture on the right changes with the step. Under 640px, `motion.js` moves each scene inside its step and drops the side visual, so it becomes a vertical stack.

This is the pattern for Claytech’s “Imagine Having Agents That Can…” list. Seven steps is long for one pin. Use one pin of the seven agent jobs, or two groups (sales/booking, then marketing/retention). Left column is the sentence from the outline. Right column is a still or a short motion of that job (a text thread, a calendar, an invoice).

### 6. AI staff playback

`staff.js` on `#stfStage`. Three `.stf-card` screens. Dots match the cards. It auto-advances.

Inside a card, each bubble (`.stf-bub`, `.stf-slot`) waits, then gets class `show`. Delay starts at 250ms and adds 850ms per line. The thread scrolls to keep the newest line in view. A check row (`.stf-ok`) appears at the end. A `[data-count]` number counts up. When the card replays, classes are cleared and it starts again.

This is the closest thing on Griffain to “watch an agent work”. For Claytech it can show one sample: lead comes in, agent replies, appointment is set. Copy can be generic (no fake customer full names presented as real).

### 7. Small UI motion (use sparingly)

Keyframe names present: `ringspin`, `orbitspin`, `counterspin`, `corepulse`, `megaDrift`, `bandSlide`, `bloomDrift`, `mockFloat`, `orbDrift`, `barGrow`, `scan`, `tickMove`, `dmpulse`, `gwspin`, `vslspin`, and a few logo/intro spins (`ckWash`, `gpopIn`, `mnavIn`). These are decorations on product mockups: spinning rings, floating cards, growing bars, a scan line. Do not put all of them on the Claytech page. Pick float + a single pulse on the “booked” check.

### 8. Real video

One `<video>` on the homepage: `assets/proof/deedra-web.mp4`, poster image, not autoplay, not muted, not looping. Proof is a customer clip you press play on. It is separate from the hero shader.

---

## Facebook reel — what we could and could not see

Link: https://www.facebook.com/share/r/1Babv1LwYB/?mibextid=wwXIfr

What is confirmed:

- `/share/r/` is a Facebook **Reel** (a short vertical video), not a page of code.
- The share redirects to story `story_fbid=1468796281954342` on page/profile id `100064719514261`.
- Facebook’s oEmbed endpoint types it as `"type": "video"` and returns a video embed for that same share URL. It does not return a title, a creator name, or a description.
- Logged out, both the desktop story and the page say: “This content isn't available at the moment.” The basic mobile URL redirects to a login wall. There is no public caption, no thumbnail we could read, and no playable file.

So the exact camera move, the model, and the software used in that clip are **not** in this file. Do not invent them. When you can open the reel while logged in, drop a note under this section: what moves, how long it loops, whether it is a product, type, or abstract shape, and whether the background is dark or light.

How to use that kind of reference when we build, without guessing the clip:

Those reels are almost always a **rendered** animation (Blender, Cinema 4D, or similar), exported as a video. They are not a live website library. “4D” in this kind of post usually means a camera move through a 3D scene with extra motion (scale, ripple, light sweep), not a fourth-dimension engine.

Two ways to put that feel on the Claytech page:

1. **Best match to the reel.** A short silent loop, about 4–8 seconds, MP4 + a poster image, sitting in the hero or in the right column of the agent steps. `autoplay`, `muted`, `loop`, `playsinline`. The 3D work happens in the render, not in the website. This is the right choice if the Facebook clip is a specific object or camera move you want matched.
2. **Best match to Griffain.** No video. A WebGL color wash plus a soft glowing orb, and CSS for the chat playback. Lighter, sharper type, and it stays crisp on large screens.

Use both if you want: shader behind the headline, and one small looping render beside the agent list. Do not cover the headline with the 3D clip. Griffain keeps type readable on top of motion.

Do not pull in Three.js, Spline, or a heavy 3D scene for v1 unless the reel is an object the visitor should drag. A landing page loses that weight. A muted loop gives the same first impression at a fraction of the cost.

---

## Claytech outline mapped onto this layout

Core line to keep in view: create agents that handle repetitive work, connect business systems, and cut manual effort.

| Outline block | Griffain pattern to follow | Claytech content |
|---|---|---|
| 1. Headline | Hero H1, Literata, huge, regular weight, white on the color field | Schedule Your Free Training on How to Automate Your Business With Agents |
| 2. Subheadline | Hero paragraph, Inter 20px / 500, white at ~92% | Build a Business That Runs on Automation. Create agents that handle lead follow-ups, appointment setting, customer communication, SMS and email marketing, and client retention, so you don't have to manage every step manually. |
| 3. CTA | White pill on the hero. Same label again in the nav as the gradient pill. | Schedule My Free Training → scheduling calendar |
| 4. Description | A white section after the logo row, then a sticky step list | “Stop Doing Everything Manually…” plus the “Imagine having agents…” paragraph, then the 7 jobs as steps |
| 7 agent jobs | Sticky chapter (System 01). One step visible in the side visual at a time. On phones, stack them. | 1 sales follow-up, 2 appointment setting, 3 SMS and email, 4 invoices and payment reminders, 5 customer questions, 6 onboarding, 7 retention check-ins |
| 5. Testimonials | Results section on `#F9F9F9`. Stars, quote, role, optional stat. | “See What's Possible When Your Workflows Work Together.” The six samples in the outline are fictional. Do not publish them as real reviews. Replace with real clients and permission, or label the section as examples and keep the wording obviously sample-level. |
| 6. Final CTA | Closing band “Start with speed” | “Ready to Stop Managing Every Little Task Yourself?” and the same calendar button |
| Logo row | Only if real client marks exist. Do not invent logos. | Skip until there are real marks. |
| AI staff player | Optional, under the 7 steps | One generic thread: inquiry → agent reply → time booked. No fake personal names presented as customers. |

Section rhythm to keep: color hero → white → soft grey proof → white close. One idea per screen. Short step labels (Respond, Qualify, Book) with two lines under them. Claytech’s seven items are already written as full sentences; on the step list, show a short label and put the full sentence underneath.

Nav CTA and both body CTAs use the same words and the same destination, the way Griffain repeats “Book a Call Now”.

---

## What we copy, and what we leave

Copy:

- Serif headline + sans body and buttons
- One saturated full-bleed hero, white rest of the page, black ink, one blue action, pill buttons
- Hero shader or a muted 3D loop, not both fighting each other
- Reveal on scroll, 26px rise, 0.7s, that cubic-bezier
- Logo marquee only when logos are real
- Sticky steps for the agent list
- Optional self-playing chat, 850ms per line
- Testimonial cards with stars and a role line
- Repeated final CTA
- Absolute nav over the hero that turns solid after the fold
- Content width about 1160px, card radius 16px, pills fully round
- Mobile collapse of the sticky visual under 640px

Leave:

- Griffain’s name, claims, client quotes, and client logos
- The 60-second guarantee, “72 hours”, “month is free”, and other stats that are theirs
- Their pricing, login, blog, and systems menu
- The full set of 37 decorative animations
- Facebook’s reel file. We use the technique (a rendered loop) once the clip can be watched, or we use Griffain’s shader if no clip is available

---

## Build order when coding starts

1. HTML sections in the order above, with the Claytech copy pasted in.
2. Tokens (color, type, radius, width) and the hero + pills + nav.
3. Scroll reveal and the sticky agent steps.
4. Hero motion: shader first, or the reel loop once that video is viewable.
5. Testimonial block, using real quotes or clearly holding the fictional samples back.
6. Wire both buttons to the calendar URL.
7. Check the page at desktop width and at 390px wide. Confirm the sticky steps become a stack, the headline does not overflow, and both buttons open the calendar.
