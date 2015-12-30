#!/bin/bash

pids=$(pgrep -f "node dist/server")

if [ ! -z "$pids" ]; then
	kill -9 $pids
fi

node dist/server &