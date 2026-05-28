const reviewForm = document.querySelector("#reviewForm");
const reviewMessage = document.querySelector("#reviewMessage");
const emailReview = document.querySelector("#emailReview");
const exportReviews = document.querySelector("#exportReviews");
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
    "YK SYSTEMS System Review Request",
    "",
    `Name: ${review.name}`,
    `Email: ${review.email}`,
    `Business: ${review.businessName}`,
    `Business type: ${review.businessType}`,
    `Website/social: ${review.webLink}`,
    `Automation goal: ${review.automationGoal}`,
    `Current tools: ${review.currentTools}`,
    `Problem area: ${review.problemArea}`,
    `Timeline: ${review.timeline}`,
    `Budget: ${review.budget}`,
    `Source: ${review.source}`,
    `Date: ${review.date}`,
  ].join("\n");
};

const downloadFile = (fileName, content, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const toCsv = (rows) => {
  const headers = [
    "Name",
    "Email",
    "Business name",
    "Business type",
    "Website/social",
    "Automation goal",
    "Current tools",
    "Problem area",
    "Timeline",
    "Budget",
    "Source",
    "Date",
  ];
  const escape = (value) => `"${String(value || "").replaceAll('"', '""')}"`;
  const body = rows.map((row) =>
    [
      row.name,
      row.email,
      row.businessName,
      row.businessType,
      row.webLink,
      row.automationGoal,
      row.currentTools,
      row.problemArea,
      row.timeline,
      row.budget,
      row.source,
      row.date,
    ].map(escape).join(",")
  );
  return [headers.join(","), ...body].join("\n");
};

const openEmailDraft = () => {
  const review = latestReview();
  if (!review) {
    reviewMessage.textContent = "Submit a review request first, then open the email draft.";
    return;
  }
  const subject = encodeURIComponent(`System review request - ${review.businessName || review.name}`);
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

emailReview?.addEventListener("click", openEmailDraft);

exportReviews?.addEventListener("click", () => {
  downloadFile("yksystems-review-requests.csv", toCsv(getReviews()), "text/csv;charset=utf-8");
});

