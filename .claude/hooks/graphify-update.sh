#!/usr/bin/env bash
# Refresh the graph after an agent turn if the file watcher is not running.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
GRAPHIFY="${HOME}/.local/bin/graphify"
PIDFILE="${ROOT}/graphify-out/.watch.pid"
LOGFILE="${ROOT}/graphify-out/watch.log"

if pgrep -f "graphify watch ${ROOT}" >/dev/null 2>&1; then
  exit 0
fi

if [[ -f "$PIDFILE" ]]; then
  pid="$(cat "$PIDFILE")"
  if kill -0 "$pid" 2>/dev/null; then
    cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
    if [[ "$cmd" == *graphify* && "$cmd" == *watch* ]]; then
      exit 0
    fi
  fi
fi

mkdir -p "${ROOT}/graphify-out"
nohup "$GRAPHIFY" update "$ROOT" >> "$LOGFILE" 2>&1 &
exit 0
