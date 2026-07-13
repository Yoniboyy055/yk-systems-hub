const AUTOMATION_BUILDER_BLUEPRINT_URL = "https://yoniboy.gumroad.com/l/automation-builder-blueprint-2026";
const AUTOMATION_BUILDER_BLUEPRINT_UTM_URL = `${AUTOMATION_BUILDER_BLUEPRINT_URL}?utm_source=hub&utm_medium=resource_card&utm_campaign=automation_blueprint`;
const AUTOMATION_CHECKLIST_URL = "assets/small-business-automation-checklist.pdf";
const AI_PROMPT_PACK_URL = "assets/automation-starter-vault.pdf";
const CRM_TEMPLATE_URL = "assets/yksystems-lead-crm.csv";
const WORKFLOW_WORKSHEET_URL = "assets/workflow-audit-worksheet.pdf";

const AI_AGENT_FIELD_MANUAL_URL = "https://yoniboy.gumroad.com/l/ai-agent-systems-field-manual";
const AI_AGENT_FIELD_MANUAL_UTM_URL = `${AI_AGENT_FIELD_MANUAL_URL}?utm_source=hub&utm_medium=resource_card&utm_campaign=agent_field_manual`;
const AGENT_DEPLOYMENT_TOOLKIT_URL = "https://yoniboy.gumroad.com/l/ai-agent-deployment-toolkit";
const AGENT_DEPLOYMENT_TOOLKIT_UTM_URL = `${AGENT_DEPLOYMENT_TOOLKIT_URL}?utm_source=hub&utm_medium=resource_card&utm_campaign=agent_deployment_toolkit`;
const AI_AGENT_BLUEPRINT_TEMPLATE_URL = "assets/agent-toolkit/ai-agent-blueprint-template.docx";
const automationResources = [
  { category: "Main guide", title: "Automation Builder Blueprint", description: "Free 130-page guide for client intake, CRM, AI follow-up, payments, approval gates, testing, and handoff systems.", cta: "Download Free Guide", href: AUTOMATION_BUILDER_BLUEPRINT_UTM_URL, external: true },
  { category: "Automation checklist", title: "Small Business Automation Checklist", description: "Find repeated tasks, slow follow-ups, missed leads, and admin work that can be automated.", cta: "Download Free Checklist", href: AUTOMATION_CHECKLIST_URL },
  { category: "AI prompt pack", title: "AI Prompt Pack for Business Owners", description: "Use practical prompts for client replies, lead follow-up, content ideas, proposals, reporting, and workflow planning.", cta: "Download Free Prompt Pack", href: AI_PROMPT_PACK_URL },
  { category: "CRM template", title: "CRM Starter Template", description: "Organize inquiries, lead status, follow-up dates, notes, and next actions in Google Sheets or Airtable.", cta: "Download Free Template", href: CRM_TEMPLATE_URL },
  { category: "Workflow worksheet", title: "Workflow Audit Worksheet", description: "Map your current process and find where time, leads, approvals, and tasks are getting lost.", cta: "Download Free Worksheet", href: WORKFLOW_WORKSHEET_URL },
];

const agentResources = [
  { category: "Field manual", title: "AI Agent Systems Field Manual", description: "A deep guide to automation, AI agents, multi-agent workflows, tools, security, governance, approvals, audit logs, and business operating systems.", cta: "Download Field Manual", href: AI_AGENT_FIELD_MANUAL_UTM_URL, external: true },
  { category: "Implementation toolkit", title: "Agent Deployment Toolkit", description: "Editable templates, visual mockups, tool starter kits, industry mini-packs, client delivery assets, and deployment checklists for agent systems.", cta: "Download Toolkit", href: AGENT_DEPLOYMENT_TOOLKIT_UTM_URL, external: true },
  { category: "Blueprint template", title: "AI Agent Blueprint Template", description: "Define an agent system's role, inputs, tools, memory, decisions, escalation path, approval rules, and expected outputs.", cta: "Download Template", href: AI_AGENT_BLUEPRINT_TEMPLATE_URL },
];

const implementationResources = [
  { category: "Operations workbook", title: "Agent Operations Workbook", description: "Permission matrix, tool access register, risk matrix, audit log schema, production readiness checklist, monthly audit, and quote calculator.", cta: "Download Workbook", href: "assets/agent-toolkit/agent-operations-workbook.xlsx" },
  { category: "Visual proof-of-work kit", title: "Visual Proof-of-Work Kit", description: "Sample architecture mockups for lead follow-up, support, reporting, content operations, multi-agent business OS, approval queues, and audit logs.", cta: "View Mockups", href: "assets/agent-toolkit/visual-proof-of-work-kit.pdf" },
  { category: "Tool starter kits", title: "Tool Starter Kits", description: "Starter plans for n8n, Make, Zapier, Supabase, Airtable, Claude/Cursor workspaces, and MCP access planning.", cta: "Get Starter Kits", href: AGENT_DEPLOYMENT_TOOLKIT_UTM_URL, external: true },
  { category: "Client conversion kit", title: "Client Conversion Kit", description: "Review received email, report delivery email, proposal email, build kickoff checklist, asset request form, and maintenance offer sheet.", cta: "Get Client Kit", href: AGENT_DEPLOYMENT_TOOLKIT_UTM_URL, external: true },
  { category: "Industry mini-packs", title: "Industry Mini-Packs", description: "Agent system packs for contractors, travel agencies, creators, digital product sellers, and local service businesses.", cta: "Get Industry Packs", href: AGENT_DEPLOYMENT_TOOLKIT_UTM_URL, external: true },
];

const renderResourceCard = ({ category, title, description, cta, href, external }) => {
  const content = `<small>${category}</small><strong>${title}</strong><span>${description}</span>`;
  const attributes = external ? ` target="_blank" rel="noreferrer"` : " download";
  return `<a class="resource-card resource-link" href="${href}"${attributes}>${content}<em>${cta} -&gt;</em></a>`;
};

const renderResources = (targetId, resources) => {
  const target = document.querySelector(`#${targetId}`);
  if (target) target.innerHTML = resources.map(renderResourceCard).join("");
};

renderResources("automationResourceGrid", automationResources);
renderResources("agentResourceGrid", agentResources);
renderResources("implementationResourceGrid", implementationResources);
