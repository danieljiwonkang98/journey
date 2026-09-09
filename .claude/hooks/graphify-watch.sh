#!/usr/bin/env bash
# Start graphify watch once per repo so code saves rebuild the graph.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
GRAPHIFY="${HOME}/.local/bin/graphify"
PIDFILE="${ROOT}/graphify-out/.watch.pid"
LOGFILE="${ROOT}/graphify-out/watch.log"

is_running() {
  local pid="$1"
  [[ -n "$pid" ]] || return 1
  kill -0 "$pid" 2>/dev/null || return 1
  local cmd
  cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
  [[ "$cmd" == *graphify* && "$cmd" == *watch* ]]
}

if [[ -f "$PIDFILE" ]]; then
  if is_running "$(cat "$PIDFILE")"; then
    exit 0
  fi
  rm -f "$PIDFILE"
fi

existing="$(pgrep -f "graphify watch ${ROOT}" || true)"
if [[ -n "$existing" ]]; then
  echo "$existing" | awk 'NR==1{print; exit}' > "$PIDFILE"
  exit 0
fi

mkdir -p "${ROOT}/graphify-out"
export PYTHONUNBUFFERED=1
nohup "$GRAPHIFY" watch "$ROOT" >> "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
