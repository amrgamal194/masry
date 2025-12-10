#!/bin/bash

# Health check script for monitoring
# Returns 0 if healthy, 1 if unhealthy

ENDPOINT=${1:-http://localhost:3000/health}
TIMEOUT=${2:-5}

response=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$ENDPOINT" 2>/dev/null)

if [ "$response" = "200" ]; then
    echo "✅ Service is healthy (HTTP $response)"
    exit 0
else
    echo "❌ Service is unhealthy (HTTP $response)"
    exit 1
fi



