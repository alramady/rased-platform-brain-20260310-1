#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STRICT_ROUTE="$ROOT_DIR/services/replication-service/src/routes/strict-replication.routes.ts"

echo "[strict_enforce] checking strict replication route contract..."

if [[ ! -f "$STRICT_ROUTE" ]]; then
  echo "[strict_enforce] strict replication route file missing"
  exit 1
fi

if ! rg -n -S 'STRICT_REPLICATION' "$STRICT_ROUTE" >/dev/null; then
  echo "[strict_enforce] STRICT_REPLICATION mode is not declared"
  exit 1
fi

if ! rg -n -S 'pixelDiffThreshold|structuralHashThreshold' "$STRICT_ROUTE" >/dev/null; then
  echo "[strict_enforce] strict threshold fields are not declared"
  exit 1
fi

if ! rg -n -S 'z\.object|safeParse|parse\(' "$STRICT_ROUTE" >/dev/null; then
  echo "[strict_enforce] missing schema validation markers in strict route"
  exit 1
fi

echo "[strict_enforce] PASS"
