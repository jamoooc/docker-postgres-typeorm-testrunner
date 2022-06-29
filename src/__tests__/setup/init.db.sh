#!/bin/bash

# https://stackoverflow.com/a/48843074
# start the docker daemon if not already running
if (! docker stats --no-stream > /dev/null 2>&1 ); then
  echo "Starting Docker...";
  open -j -a Docker # -j starts in background

  # wait until the Docker daemon is running
  echo "Waiting for Docker to launch."
  while (! docker stats --no-stream > /dev/null 2>&1 ); do
    sleep 1
  done
fi
echo "Docker daemon running.";

echo "Starting PostgreSQL container...";
docker-compose up -d

# poll PostgreSQL instance until it is ready to accept connections
while (! pg_isready -p 5555 -d testing_db -h localhost -U postgres > /dev/null 2>&1 ); do
  sleep 1;
done;

echo "PostgreSQL container running.";
