import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const sourcePath = resolve(root, "assets/automation-builder-blueprint.md");
const outputPath = resolve(root, "assets/automation-builder-blueprint-print.html");

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const markdown = readFileSync(sourcePath, "utf8");
const lines = markdown.split(/\r?\n/);
const html = [];
let listOpen = false;
let codeOpen = false;
let paragraph = [];

const flushParagraph = () => {
  if (!paragraph.length) return;
  html.push(`<p>${paragraph.join(" ")}</p>`);
  paragraph = [];
};

const closeList = () => {
  if (!listOpen) return;
  html.push("</ul>");
  listOpen = false;
};

for (const rawLine of lines) {
  const line = rawLine.trimEnd();

  if (line.startsWith("```")) {
    flushParagraph();
    closeList();
    if (codeOpen) {
      html.push("</code></pre>");
      codeOpen = false;
    } else {
      html.push("<pre><code>");
      codeOpen = true;
    }
    continue;
  }

  if (codeOpen) {
    html.push(escapeHtml(rawLine));
    continue;
  }

  if (!line.trim()) {
    flushParagraph();
    closeList();
    continue;
  }

  if (line.startsWith("# ")) {
    flushParagraph();
    closeList();
    html.push(`<h1>${escapeHtml(line.slice(2))}</h1>`);
    continue;
  }

  if (line.startsWith("## ")) {
    flushParagraph();
    closeList();
    html.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    continue;
  }

  if (line.startsWith("### ")) {
    flushParagraph();
    closeList();
    html.push(`<h3>${escapeHtml(line.slice(4))}</h3>`);
    continue;
  }

  if (line.startsWith("- ")) {
    flushParagraph();
    if (!listOpen) {
      html.push("<ul>");
      listOpen = true;
    }
    html.push(`<li>${escapeHtml(line.slice(2))}</li>`);
    continue;
  }

  if (/^\d+\.\s/.test(line)) {
    flushParagraph();
    if (!listOpen) {
      html.push("<ul>");
      listOpen = true;
    }
    html.push(`<li>${escapeHtml(line.replace(/^\d+\.\s/, ""))}</li>`);
    continue;
  }

  paragraph.push(escapeHtml(line));
}

flushParagraph();
closeList();

const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>The Automation Builder Blueprint</title>
  <style>
    @page { margin: 0.7in; }
    body {
      max-width: 760px;
      margin: 0 auto;
      color: #050807;
      font-family: Arial, sans-serif;
      line-height: 1.58;
    }
    h1, h2, h3 {
      color: #003d37;
      line-height: 1.08;
      page-break-after: avoid;
    }
    h1 {
      margin-top: 0;
      font-size: 38px;
      text-transform: uppercase;
      border-bottom: 4px solid #12c5b4;
      padding-bottom: 18px;
    }
    h2 {
      margin-top: 34px;
      font-size: 24px;
    }
    h3 {
      margin-top: 24px;
      font-size: 18px;
    }
    p, li {
      font-size: 12.5px;
    }
    ul {
      padding-left: 20px;
    }
    pre {
      white-space: pre-wrap;
      background: #f3faf7;
      border-left: 4px solid #008b81;
      padding: 14px;
      font-size: 11px;
    }
  </style>
</head>
<body>
${html.join("\n")}
</body>
</html>`;

writeFileSync(outputPath, document);
console.log(`Wrote ${outputPath}`);

