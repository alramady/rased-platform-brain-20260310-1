#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PATTERN='rewrite_prompt|sanitize_prompt|swap_action|override_tool|bypass_policy'

SCAN_PATHS=(
  "$ROOT_DIR/services"
  "$ROOT_DIR/frontend"
  "$ROOT_DIR/packages"
)

echo "[no_silent_override] scanning for forbidden override hooks..."
MATCHES="$(rg -n -S "$PATTERN" "${SCAN_PATHS[@]}" \
  --glob '!**/node_modules/**' \
  --glob '!**/dist/**' \
  --glob '!**/.next/**' || true)"

if [[ -n "$MATCHES" ]]; then
  echo "[no_silent_override] forbidden patterns found:"
  echo "$MATCHES"
  exit 1
fi

echo "[no_silent_override] PASS"
