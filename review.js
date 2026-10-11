// Free Review form -> POST to the YK+ Systems intake endpoint (no localStorage, no mailto).
const INTAKE_ENDPOINT = "https://yksystems.ca/api/intake";
const FALLBACK_EMAIL = "yoniboy055@gmail.com"; // OWNER TO CONFIRM business mailbox (shown only when sending fails)

const reviewForm = document.querySelector("#reviewForm");
const reviewMessage = document.querySelector("#reviewMessage");
const submitButton = reviewForm?.querySelector('button[type="submit"]');
const startedAt = Date.now();
let submissionId = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;

const say = (text, kind) => {
  reviewMessage.textContent = text;
  reviewMessage.dataset.state = kind || "";
  reviewMessage.setAttribute("role", kind === "error" ? "alert" : "status");
};

const attribution = () => {
  const p = new URLSearchParams(window.location.search);
  let host = "";
  try { host = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) { host = ""; }
  return {
    utm_source: p.get("utm_source") || "direct",
    utm_medium: p.get("utm_medium") || "none",
    utm_campaign: p.get("utm_campaign") || "none",
    landing_page: window.location.pathname,
    referrer: host,
    form: "hub-review",
  };
};

const buildMessage = (d) =>
  [
    `Business type: ${d.get("businessType") || ""}`,
    `Website/social: ${d.get("webLink") || ""}`,
    `Timeline: ${d.get("timeline") || ""}`,
    `Budget: ${d.get("budget") || ""}`,
    "",
    "What they want to improve first:",
    d.get("automationGoal") || "",
    "",
    "Current tools:",
    d.get("currentTools") || "",
    "",
    "Where leads, tasks or approvals get lost:",
    d.get("problemArea") || "",
  ].join("\n");

reviewForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitButton?.disabled) return;
  const d = new FormData(reviewForm);
  submitButton.disabled = true;
  say("Sending your request…");
  try {
    const res = await fetch(INTAKE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: d.get("name"),
        email: d.get("email"),
        company: d.get("businessName") || "",
        projectType: "Free Review",
        message: buildMessage(d),
        consent: d.get("consent") === "on",
        marketingOptIn: d.get("marketingOptIn") === "on",
        website: d.get("website") || "",
        submissionId,
        startedAt,
        attribution: attribution(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      reviewForm.reset();
      submissionId = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
      say(`Thanks — your review request was sent${data.reference ? ` (reference ${data.reference})` : ""}. We'll reply by email.`, "ok");
    } else {
      const first = data.errors ? Object.values(data.errors)[0] : "";
      say(`${first || data.message || "We couldn't send your request."} Your answers are still in the form. You can also email ${FALLBACK_EMAIL}.`, "error");
    }
  } catch (e) {
    say(`Network problem — your request was not sent. Your answers are still in the form. You can also email ${FALLBACK_EMAIL}.`, "error");
  } finally {
    submitButton.disabled = false;
  }
});
