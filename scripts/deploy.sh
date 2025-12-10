#!/bin/bash

# Deployment script for Masary API
# Usage: ./scripts/deploy.sh [environment]
# Example: ./scripts/deploy.sh production

set -e

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    exit 1
fi

# Load environment variables
export $(cat "$PROJECT_DIR/.env" | grep -v '^#' | xargs)

# Build the application
echo -e "${YELLOW}📦 Building application...${NC}"
cd "$PROJECT_DIR"
npm ci
npm run build

# Run migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
npm run migrate:up

# Health check
echo -e "${YELLOW}🏥 Checking application health...${NC}"
sleep 5
HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health || echo "000")

if [ "$HEALTH_CHECK" = "200" ]; then
    echo -e "${GREEN}✅ Application is healthy!${NC}"
else
    echo -e "${RED}❌ Health check failed (Status: $HEALTH_CHECK)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"



