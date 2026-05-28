# YK SYSTEMS Free Resource Library

This folder contains the first launchable version of the YK SYSTEMS free lead-magnet funnel.

## What Is Included

- `index.html` - the public landing page for the free resource library.
- `styles.css` - the page design system and responsive layout.
- `script.js` - lead capture handling, source tracking, and local export helpers.
- `assets/automation-starter-vault.md` - the full Free Package 001 content.
- `assets/automation-builder-blueprint-professional-edition-2026.pdf` - the 130-page customer-ready flagship book.
- `assets/automation-builder-blueprint.md` - backup starter manuscript.
- `assets/yksystems-lead-crm.csv` - starter Google Sheets CRM columns.
- `assets/follow-up-email-sequence.md` - the 5-email nurture sequence.
- `assets/launch-and-service-kit.md` - Reddit/LinkedIn launch copy, service offers, intake form, proposal template, and delivery checklist.

## Launch Order

1. Upload `assets/automation-builder-blueprint-professional-edition-2026.pdf` to the free Gumroad product.
2. Review and polish the supporting markdown resources.
3. Use `npm run build:book` only if the backup starter manuscript changes.
4. The Gumroad product is live at:
   - `https://yoniboy.gumroad.com/l/automation-builder-blueprint-2026`
5. Open `index.html` locally and test the free-download flow.
6. Open `review.html` locally and test the system-review form.
7. Upload the page to your site or deploy it as a static project.
8. Post the tracked landing-page link on Reddit, LinkedIn, and groups.

## Vercel Note

The Vercel CLI is not installed on this machine. Install it with:

```powershell
npm i -g vercel
```

That unlocks `vercel env pull`, `vercel deploy`, and `vercel logs` for agentic deployment work later.
