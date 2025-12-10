# Infrastructure Quick Start

## 🐳 Docker Quick Start

### Using Docker Compose (Recommended)

```bash
# 1. Start all services (MongoDB + API)
docker compose up -d

# 2. View logs
docker compose logs -f api

# 3. Stop services
docker compose down
```

**Note**: If you have Docker Compose v1, use `docker-compose` (with hyphen).  
For Docker Compose v2 (default), use `docker compose` (without hyphen).

### Development Mode

```bash
# Start with hot reload
docker compose -f docker-compose.dev.yml up -d
```

### Access Services

- **API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Mongo Express** (optional): http://localhost:8081

## 🚀 Deployment

### Local Deployment

```bash
# Setup
./scripts/setup.sh

# Deploy
./scripts/deploy.sh production
```

### Docker Deployment

```bash
# Build
docker build -t masary-api:latest .

# Run
docker run -d \
  --name masary-api \
  -p 3000:3000 \
  --env-file .env \
  masary-api:latest
```

## 🔍 Health Checks

```bash
# Check API health
curl http://localhost:3000/health

# Detailed health
curl http://localhost:3000/health/detailed

# Using script
./scripts/health-check.sh
```

## 📊 Monitoring

Health check endpoints are available for:
- Docker health checks
- Kubernetes probes
- Load balancers
- Monitoring services

## 📚 Full Documentation

See `INFRASTRUCTURE.md` for complete infrastructure documentation.

