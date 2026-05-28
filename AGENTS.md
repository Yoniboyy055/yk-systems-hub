# YK SYSTEMS Resource Library Agent Guide

## Project Shape

- This is a static launch page for the YK SYSTEMS Free Resource Library.
- Core files are `index.html`, `review.html`, `styles.css`, `script.js`, `review.js`, and resource files in `assets/`.
- `vercel.json` contains static deployment headers and clean URL behavior.
- `tools/build-print-assets.mjs` rebuilds `assets/automation-builder-blueprint-print.html` from `assets/automation-builder-blueprint.md`.
- There are no production secrets in this repo. Do not add API keys, tokens, form credentials, or customer data to committed files.

## Commands

- Run `npm run verify` after code changes.
- Run `npm run build:book` only when the backup manuscript changes or when verifying generated print assets.
- Run `npm run serve` to preview locally.

## Editing Rules

- Keep the site static unless the user explicitly asks for a backend or external service integration.
- Preserve download links and Gumroad links unless the user asks to change launch routing.
- If replacing the placeholder system-review form URL, use a real production URL supplied by the user.
- Keep copy clear, direct, and suitable for small business owners, creators, contractors, and founders.
- Avoid broad redesigns when the request is about launch readiness, cloud setup, or small content edits.

## Validation

- Check JavaScript syntax with `npm run verify`.
- For visual changes, preview the page at a local static server and inspect desktop and mobile widths.
- Confirm generated files are intentional before committing changes under `assets/`.
