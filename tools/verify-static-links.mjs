import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = ["index.html", "review.html", "library.js", "script.js"];
const missing = [];

const localTargets = new Set();
for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of source.matchAll(/["'`](assets\/[^"'`?#]+)["'`]/g)) {
    localTargets.add(match[1]);
  }
}

for (const target of localTargets) {
  if (!fs.existsSync(path.join(root, target))) missing.push(target);
}

const librarySource = fs.readFileSync(path.join(root, "library.js"), "utf8");
if (/const\s+[A-Z0-9_]+_URL\s*=\s*["']\s*["']/.test(librarySource)) {
  missing.push("library.js contains an empty resource URL");
}

if (missing.length) {
  console.error("Static resource verification failed:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Verified ${localTargets.size} local resource links.`);
