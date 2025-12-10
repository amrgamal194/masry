#!/bin/bash

# Script to start Docker Desktop and wait for it to be ready
# Usage: ./scripts/start-docker.sh

echo "🐳 Starting Docker Desktop..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if Docker is already running
if docker ps &> /dev/null; then
    echo -e "${GREEN}✅ Docker is already running!${NC}"
    docker ps
    exit 0
fi

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - Start Docker Desktop
    echo -e "${YELLOW}Opening Docker Desktop...${NC}"
    open -a Docker
    
    echo -e "${YELLOW}Waiting for Docker to start (this may take 30-60 seconds)...${NC}"
    
    # Wait for Docker to be ready (max 2 minutes)
    MAX_WAIT=120
    ELAPSED=0
    
    while [ $ELAPSED -lt $MAX_WAIT ]; do
        if docker ps &> /dev/null; then
            echo -e "${GREEN}✅ Docker is ready!${NC}"
            docker ps
            exit 0
        fi
        
        echo -n "."
        sleep 2
        ELAPSED=$((ELAPSED + 2))
    done
    
    echo -e "\n${RED}❌ Docker did not start within $MAX_WAIT seconds${NC}"
    echo "Please check Docker Desktop manually"
    exit 1
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux - Start Docker service
    echo -e "${YELLOW}Starting Docker service...${NC}"
    
    if command -v systemctl &> /dev/null; then
        sudo systemctl start docker
        sudo systemctl enable docker
        
        if docker ps &> /dev/null; then
            echo -e "${GREEN}✅ Docker is ready!${NC}"
            docker ps
            exit 0
        else
            echo -e "${RED}❌ Failed to start Docker${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ systemctl not found. Please start Docker manually${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Unsupported operating system${NC}"
    exit 1
fi



