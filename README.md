# YK+ Systems Resource Hub

This repository powers the official [YK+ Systems Resource Hub](https://hub.yksystems.ca/). The canonical company website is [YK+ Systems](https://yksystems.ca/).

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
5. The public landing page is live at:
   - `https://hub.yksystems.ca`
   - Vercel fallback: `https://yk-systems-hub.vercel.app`
6. The public system-review page is live at:
   - `https://hub.yksystems.ca/review`
   - Vercel fallback: `https://yk-systems-hub.vercel.app/review`
7. Custom-domain status:
   - `hub.yksystems.ca` is live and resolves through the existing Vercel project.
   - Keep the DNS record and Vercel domain assignment intact during future deployment changes.
8. Post the tracked landing-page link on Reddit, LinkedIn, and groups.

## Deployment Note

The Vercel project is linked as `yk-systems-hub`.

Useful commands:

```powershell
npm run verify
vercel deploy --prod
```

`hub.yksystems.ca` is the live public Resource Hub domain. The Vercel project was historically deployed from the CLI; connect the Git repository to Vercel so future merges can deploy automatically.
