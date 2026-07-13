const leadForm = document.querySelector("#leadForm");
const formMessage = document.querySelector("#formMessage");
const exportButton = document.querySelector("#exportLeads");
const storageKey = "yksystems-resource-leads";

const getLeads = () => JSON.parse(localStorage.getItem(storageKey) || "[]");

const saveLeads = (leads) => {
  localStorage.setItem(storageKey, JSON.stringify(leads));
};

const toCsv = (rows) => {
  const headers = [
    "Name",
    "Email",
    "Source",
    "Resource downloaded",
    "Business type",
    "What they want to automate",
    "Follow-up status",
    "Notes",
    "Date added",
  ];

  const escape = (value) => `"${String(value || "").replaceAll('"', '""')}"`;
  const body = rows.map((row) =>
    [
      row.name,
      row.email,
      row.source,
      row.resource,
      row.businessType,
      row.automationGoal,
      row.status,
      row.notes,
      row.date,
    ].map(escape).join(",")
  );

  return [headers.join(","), ...body].join("\n");
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

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const params = new URLSearchParams(window.location.search);
  const lead = {
    name: data.get("name"),
    email: data.get("email"),
    source: params.get("utm_source") || document.referrer || "Direct/local",
    resource: "The YK SYSTEMS Automation Starter Vault",
    businessType: data.get("businessType"),
    automationGoal: data.get("automationGoal"),
    status: "New",
    notes: "Submitted from landing page",
    date: new Date().toISOString().slice(0, 10),
  };

  const leads = getLeads();
  leads.push(lead);
  saveLeads(leads);
  formMessage.textContent = "Access unlocked. Your local CRM entry is saved and the vault download is starting.";
  leadForm.reset();
  window.setTimeout(() => {
    window.location.href = "assets/automation-starter-vault.pdf";
  }, 700);
});

exportButton?.addEventListener("click", () => {
  const leads = getLeads();
  const csv = toCsv(leads);
  downloadFile("yksystems-leads-export.csv", csv, "text/csv;charset=utf-8");
});
