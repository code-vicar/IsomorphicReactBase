#!/bin/bash
set -e

if [ "$1" = 'npm' ]; then
  echo "Starting Isomorphic React Base"
  exec /gosu scott "$@"
fi

echo "Passthrough command"
exec "$@"
