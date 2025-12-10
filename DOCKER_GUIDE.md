# Docker Quick Start Guide

## 🐳 Docker Compose Commands

### Check Your Docker Compose Version

```bash
# Check if you have Docker Compose v2 (recommended)
docker compose version

# Or check for v1
docker-compose --version
```

### Quick Start

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f api

# Stop services
docker compose down
```

## 📝 Command Reference

### Using Docker Compose v2 (Recommended)

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f api

# Rebuild
docker compose build --no-cache

# Restart services
docker compose restart

# Scale services
docker compose up -d --scale api=3
```

### Using Docker Compose v1 (Legacy)

If you have the standalone `docker-compose` command:

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f api
```

### Using Helper Script

We provide a helper script that auto-detects your Docker Compose version:

```bash
# Make script executable
chmod +x scripts/docker-compose.sh

# Use it like docker compose
./scripts/docker-compose.sh up -d
./scripts/docker-compose.sh logs -f api
./scripts/docker-compose.sh down
```

## 🔧 Common Issues

### Issue: "command not found: docker-compose"

**Solution**: You have Docker Compose v2. Use `docker compose` (without hyphen) instead.

```bash
# Instead of: docker-compose up -d
docker compose up -d
```

### Issue: "command not found: docker compose"

**Solution**: Install Docker Compose or use the standalone version.

```bash
# Install Docker Compose v2 (usually comes with Docker Desktop)
# Or install standalone:
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🚀 Quick Commands

```bash
# Start everything
docker compose up -d

# View API logs
docker compose logs -f api

# View MongoDB logs
docker compose logs -f mongodb

# Restart API only
docker compose restart api

# Stop everything
docker compose down

# Stop and remove volumes (clean slate)
docker compose down -v
```

## 📊 Service Status

```bash
# Check running services
docker compose ps

# Check service health
docker compose ps --format json | jq '.[] | {name: .Name, status: .State, health: .Health}'
```

## 🔍 Troubleshooting

### Services won't start

```bash
# Check logs
docker compose logs

# Check service status
docker compose ps

# Rebuild from scratch
docker compose build --no-cache
docker compose up -d
```

### Port already in use

```bash
# Check what's using the port
lsof -i :3000

# Or change port in docker-compose.yml
# Edit: ports: "3001:3000"
```

### Database connection issues

```bash
# Check MongoDB is running
docker compose ps mongodb

# Check MongoDB logs
docker compose logs mongodb

# Test connection
docker exec masary-mongodb mongosh --eval "db.adminCommand('ping')"
```

## 📚 More Information

See `INFRASTRUCTURE.md` for complete infrastructure documentation.



