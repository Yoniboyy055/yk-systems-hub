# Codex Cloud Setup

Use this when you want to work on this project from Codex cloud, including from your phone.

## What Is Ready

- Repository instructions: `AGENTS.md`
- Setup script to paste into the Codex cloud environment: `.codex/cloud-setup.sh`
- Maintenance script for cached cloud containers: `.codex/cloud-maintenance.sh`
- Verification command: `npm run verify`

## Required One-Time Steps

1. Push this folder to a GitHub-hosted repository.
2. Open ChatGPT on your phone or desktop and go to Codex.
3. Connect GitHub if it is not connected yet.
4. Allow Codex access to this repository.
5. Create a Codex cloud environment for this repo.

## Recommended Codex Cloud Environment Settings

- Environment name: `YK Systems Resource Library`
- Repository: the GitHub repo for this folder
- Branch: `main`
- Runtime image: default `universal`
- Package versions: Node.js 20 or newer
- Agent internet access: off by default
- Setup script: paste the contents of `.codex/cloud-setup.sh`
- Maintenance script: paste the contents of `.codex/cloud-maintenance.sh`
- Environment variables: none required
- Secrets: none required
- Validation command: `npm run verify`

## Setup Script

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Node: $(node --version)"
echo "npm: $(npm --version)"

npm install
npm run verify
```

## Maintenance Script

```bash
#!/usr/bin/env bash
set -euo pipefail

npm install
npm run verify
```

## First Phone Prompt

```text
Inspect this repository, read AGENTS.md, run npm run verify, and tell me if the YK SYSTEMS resource library is ready for a small content or launch change.
```

## Notes

- Codex cloud runs from GitHub, not directly from the OneDrive folder on this machine.
- Keep secrets out of the repo. If a future integration needs credentials, add them as Codex cloud environment secrets or deployment-platform secrets.
- The current site is static, so most cloud tasks should not need agent internet access after setup.
