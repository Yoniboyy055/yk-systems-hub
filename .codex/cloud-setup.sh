#!/usr/bin/env bash
set -euo pipefail

echo "Node: $(node --version)"
echo "npm: $(npm --version)"

# This project has no package dependencies today, but npm install keeps the
# setup future-proof if dependencies are added later.
npm install
npm run verify
