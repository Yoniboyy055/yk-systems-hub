const reviewForm = document.querySelector("#reviewForm");
const reviewMessage = document.querySelector("#reviewMessage");
const reviewStorageKey = "yksystems-review-requests";
const reviewEmail = "yoniboy055@gmail.com";

const getReviews = () => JSON.parse(localStorage.getItem(reviewStorageKey) || "[]");

const saveReviews = (reviews) => {
  localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
};

const latestReview = () => getReviews().at(-1);

const reviewToEmail = (review) => {
  if (!review) return "";
  return [
    "YK SYSTEMS Automation / Agent Review Request",
    "",
    `Name: ${review.name}`,
    `Email: ${review.email}`,
    `Business: ${review.businessName}`,
    `Business type: ${review.businessType}`,
    `Website/social: ${review.webLink}`,
    `System improvement goal: ${review.automationGoal}`,
    `Current tools: ${review.currentTools}`,
    `Problem area: ${review.problemArea}`,
    `Timeline: ${review.timeline}`,
    `Budget: ${review.budget}`,
    `Source: ${review.source}`,
    `Date: ${review.date}`,
  ].join("\n");
};

const openEmailDraft = () => {
  const review = latestReview();
  if (!review) {
    reviewMessage.textContent = "Submit a review request first, then open the email draft.";
    return;
  }
  const subject = encodeURIComponent(`Automation / agent review request - ${review.businessName || review.name}`);
  const body = encodeURIComponent(reviewToEmail(review));
  window.location.href = `mailto:${reviewEmail}?subject=${subject}&body=${body}`;
};

reviewForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(reviewForm);
  const params = new URLSearchParams(window.location.search);
  const review = {
    name: data.get("name"),
    email: data.get("email"),
    businessName: data.get("businessName"),
    businessType: data.get("businessType"),
    webLink: data.get("webLink"),
    automationGoal: data.get("automationGoal"),
    currentTools: data.get("currentTools"),
    problemArea: data.get("problemArea"),
    timeline: data.get("timeline"),
    budget: data.get("budget"),
    source: params.get("utm_source") || document.referrer || "Direct/local",
    date: new Date().toISOString().slice(0, 10),
  };
  const reviews = getReviews();
  reviews.push(review);
  saveReviews(reviews);
  reviewMessage.textContent = "Review request saved. Opening an email draft now.";
  reviewForm.reset();
  window.setTimeout(openEmailDraft, 400);
});
