#!/bin/bash
# Quick script to run Masary API

echo "🚀 Masary API - Quick Run Script"
echo ""

# Check Docker
if ! docker ps &> /dev/null; then
    echo "❌ Docker is not running!"
    echo "Please start Docker Desktop first:"
    echo "  macOS: open -a Docker"
    echo "  Or run: ./scripts/start-docker.sh"
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start services
echo "📦 Starting services..."
docker compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check health
echo ""
echo "🏥 Checking API health..."
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/health 2>/dev/null || echo "000")

if [ "$HEALTH" = "200" ]; then
    echo "✅ API is healthy!"
    echo ""
    echo "🎉 Services are running!"
    echo ""
    echo "📍 Access points:"
    echo "  - API: http://localhost:3000"
    echo "  - Health: http://localhost:3000/health"
    echo "  - MongoDB: localhost:27017"
    echo ""
    echo "📋 Useful commands:"
    echo "  - View logs: docker compose logs -f api"
    echo "  - Stop: docker compose down"
    echo "  - Restart: docker compose restart api"
else
    echo "⚠️  API health check returned: $HEALTH"
    echo "Check logs: docker compose logs api"
fi
