#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

SCAN_PATHS=(
  "$ROOT_DIR/services"
  "$ROOT_DIR/frontend"
  "$ROOT_DIR/packages"
  "$ROOT_DIR/docs"
)

PATTERN='TODO|FIXME|STUB|MOCK|PLACEHOLDER|return true //|return ok'

echo "[no_placeholders] scanning for forbidden runtime markers..."
MATCHES="$(rg -n -S "$PATTERN" "${SCAN_PATHS[@]}" \
  --glob '!docs/legacy/**' \
  --glob '!**/node_modules/**' \
  --glob '!**/dist/**' \
  --glob '!**/.next/**' \
  --glob '!**/coverage/**' \
  --glob '!**/__tests__/**' \
  --glob '!**/*.test.*' \
  --glob '!**/verify.sh' || true)"

if [[ -n "$MATCHES" ]]; then
  echo "[no_placeholders] forbidden markers found:"
  echo "$MATCHES"
  exit 1
fi

echo "[no_placeholders] PASS"
