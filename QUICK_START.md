# 🚀 Quick Start Guide

## Step 1: Start Docker Desktop

### On macOS:
```bash
# Option 1: Use the helper script
./scripts/start-docker.sh

# Option 2: Manually open Docker Desktop
open -a Docker

# Wait for Docker to start (check system tray icon)
# Then verify:
docker ps
```

### Verify Docker is Running:
```bash
# This should work without errors
docker ps

# Check Docker version
docker --version
docker compose version
```

## Step 2: Start Services

Once Docker is running:

```bash
# Start all services (MongoDB + API)
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f api
```

## Step 3: Test the API

```bash
# Health check
curl http://localhost:3000/health

# Or open in browser
open http://localhost:3000/health
```

## 🎯 Complete Setup

```bash
# 1. Start Docker
./scripts/start-docker.sh

# 2. Wait for Docker to be ready (30-60 seconds)

# 3. Start services
docker compose up -d

# 4. Check logs
docker compose logs -f api

# 5. Test API
curl http://localhost:3000/health
```

## 📝 Common Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f api

# Restart API
docker compose restart api

# Check status
docker compose ps
```

## ⚠️ Troubleshooting

If you see "Cannot connect to Docker daemon":
1. Make sure Docker Desktop is running
2. Check system tray for Docker icon
3. Wait 30-60 seconds after opening Docker Desktop
4. Run `docker ps` to verify

See `DOCKER_TROUBLESHOOTING.md` for more help.



