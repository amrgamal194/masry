# Infrastructure Documentation

## 🏗️ Infrastructure Overview

This document describes the infrastructure setup for Masary API, including Docker, CI/CD, deployment, and monitoring configurations.

---

## 📦 Docker Configuration

### Production Dockerfile

**File**: `Dockerfile`

- **Base Image**: `node:20-alpine` (multi-stage build)
- **Build Stage**: Compiles TypeScript
- **Production Stage**: Minimal production image
- **Security**: Non-root user, health checks
- **Size**: Optimized for production

### Development Dockerfile

**File**: `Dockerfile.dev`

- **Base Image**: `node:20-alpine`
- **Purpose**: Development with hot reload
- **Volume Mounts**: Source code for live updates

### Docker Compose

#### Production (`docker-compose.yml`)

Services:
- **mongodb**: MongoDB 7.0 with persistent volume
- **api**: Masary API application
- **mongo-express** (optional): Database UI

Features:
- Health checks for all services
- Persistent data volumes
- Network isolation
- Environment variable configuration

#### Development (`docker-compose.dev.yml`)

- Hot reload enabled
- Development MongoDB instance
- Source code mounted as volumes

### Usage

```bash
# Production
docker compose up -d

# Development
docker compose -f docker-compose.dev.yml up -d

# With MongoDB Express UI
docker compose --profile tools up -d
```

**Note**: Docker Compose v2 uses `docker compose` (without hyphen).  
For v1 compatibility, use `docker-compose` (with hyphen).

---

## 🔄 CI/CD Pipeline

### GitHub Actions

#### CI Pipeline (`.github/workflows/ci.yml`)

**Triggers**:
- Push to `main` or `develop`
- Pull requests

**Jobs**:
1. **Type Check**: Validates TypeScript types
2. **Build**: Compiles application
3. **Docker Build**: Builds Docker image
4. **Deploy** (optional): Deploys to production

#### Docker Publish (`.github/workflows/docker-publish.yml`)

**Triggers**:
- Push to `main`
- Version tags (`v*`)
- Manual workflow dispatch

**Actions**:
- Builds Docker image
- Publishes to GitHub Container Registry
- Tags with version, branch, and SHA

---

## 🚀 Deployment Scripts

### Setup Script (`scripts/setup.sh`)

**Purpose**: Initial project setup

**Actions**:
- Checks Node.js version
- Installs dependencies
- Creates `.env` file
- Builds TypeScript
- Checks MongoDB connection
- Runs migrations

**Usage**:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Deploy Script (`scripts/deploy.sh`)

**Purpose**: Production deployment

**Actions**:
- Validates environment
- Builds application
- Runs migrations
- Health check verification

**Usage**:
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

### Health Check Script (`scripts/health-check.sh`)

**Purpose**: Service health monitoring

**Usage**:
```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh http://localhost:3000/health
```

---

## 🐳 Docker Commands

### Build

```bash
# Production build
docker build -t masary-api:latest .

# Development build
docker build -f Dockerfile.dev -t masary-api:dev .
```

### Run

```bash
# Production
docker run -d \
  --name masary-api \
  -p 3000:3000 \
  --env-file .env \
  masary-api:latest

# Development
docker run -d \
  --name masary-api-dev \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  --env-file .env \
  masary-api:dev
```

### Docker Compose

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f api

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild
docker compose build --no-cache
```

**Note**: Use `docker compose` (v2) or `docker-compose` (v1) based on your installation.

---

## 🌐 Environment Configuration

### Environment Files

- `.env` - Local development
- `.env.production.example` - Production template
- `env.template` - General template

### Environment Variables

#### Required
- `PORT` - Server port
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - Refresh token secret

#### Optional
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for email links
- `EMAIL_*` - Email configuration
- `RATE_LIMIT_*` - Rate limiting configuration

---

## 📊 Monitoring & Health Checks

### Health Check Endpoints

1. **Basic Health**: `GET /health`
   - Returns service status
   - Response time: < 10ms

2. **Detailed Health**: `GET /health/detailed`
   - Database connection status
   - Memory usage
   - Uptime
   - Service version

### Docker Health Checks

Configured in `docker-compose.yml`:
- **Interval**: 30 seconds
- **Timeout**: 3-10 seconds
- **Retries**: 3-5
- **Start Period**: 40 seconds

### Monitoring Integration

The health check endpoints can be integrated with:
- Kubernetes liveness/readiness probes
- Docker health checks
- Load balancer health checks
- Monitoring services (Prometheus, Datadog, etc.)

---

## 🔒 Security Considerations

### Docker Security

1. **Non-root User**: Application runs as `nodejs` user
2. **Minimal Base Image**: Alpine Linux for smaller attack surface
3. **Multi-stage Build**: Reduces final image size
4. **No Secrets in Image**: Use environment variables
5. **Health Checks**: Automatic container restart on failure

### Network Security

- **Network Isolation**: Services in dedicated Docker network
- **Port Exposure**: Only necessary ports exposed
- **Internal Communication**: Services communicate via internal network

### Secrets Management

**Recommended**:
- Use Docker secrets (Docker Swarm)
- Use Kubernetes secrets
- Use external secret managers (AWS Secrets Manager, HashiCorp Vault)
- Never commit secrets to repository

---

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale API service
docker-compose up -d --scale api=3

# With load balancer
# Use nginx or traefik for load balancing
```

### Database Scaling

- **Read Replicas**: Configure MongoDB replica set
- **Sharding**: For large datasets
- **Connection Pooling**: Already configured in Mongoose

---

## 🗄️ Database Setup

### MongoDB Initialization

**File**: `docker/mongo-init.js`

**Actions**:
- Creates `masary_db` database
- Creates collections with validation
- Creates indexes
- Sets up initial schema

### Migration Strategy

1. **Development**: Run migrations manually
2. **Staging**: Run migrations in CI/CD
3. **Production**: Run migrations in deployment script

---

## 🚢 Deployment Strategies

### Docker Deployment

1. **Build Image**: `docker build -t masary-api:latest .`
2. **Tag Image**: `docker tag masary-api:latest registry/masary-api:v1.0.0`
3. **Push Image**: `docker push registry/masary-api:v1.0.0`
4. **Deploy**: Pull and run on server

### Docker Compose Deployment

1. Copy `docker-compose.yml` to server
2. Copy `.env` file (securely)
3. Run `docker-compose up -d`

### Kubernetes Deployment (Future)

- Deployment manifests
- Service definitions
- ConfigMaps and Secrets
- Ingress configuration

---

## 🔧 Maintenance

### Logs

```bash
# Application logs
docker-compose logs -f api

# MongoDB logs
docker-compose logs -f mongodb

# All logs
docker-compose logs -f
```

### Backup

```bash
# MongoDB backup
docker exec masary-mongodb mongodump --out /backup

# Restore
docker exec masary-mongodb mongorestore /backup
```

### Updates

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose build --no-cache
docker-compose up -d
```

---

## 📝 Infrastructure Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Secrets secured
- [ ] Database backups configured
- [ ] Health checks working
- [ ] Logging configured
- [ ] Monitoring setup

### Post-Deployment
- [ ] Health checks passing
- [ ] Database migrations completed
- [ ] API endpoints responding
- [ ] Logs accessible
- [ ] Monitoring alerts configured

---

## 🆘 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs api

# Check container status
docker-compose ps

# Restart services
docker-compose restart
```

### Database Connection Issues

```bash
# Check MongoDB status
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec masary-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Build Failures

```bash
# Clear Docker cache
docker builder prune

# Rebuild without cache
docker-compose build --no-cache
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)

---

**Last Updated**: 2024  
**Version**: 1.0.0

