#!/bin/bash

# Docker Compose wrapper script
# Automatically detects and uses the correct docker compose command
# Usage: ./scripts/docker-compose.sh [docker compose commands]
# Example: ./scripts/docker-compose.sh up -d

# Check for Docker Compose v2 (docker compose)
if docker compose version &> /dev/null; then
    docker compose "$@"
# Check for Docker Compose v1 (docker-compose)
elif command -v docker-compose &> /dev/null; then
    docker-compose "$@"
else
    echo "❌ Docker Compose not found!"
    echo "Please install Docker Compose v2 or v1"
    exit 1
fi



