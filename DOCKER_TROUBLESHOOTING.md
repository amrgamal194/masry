# Docker Troubleshooting Guide

## 🚨 Common Issues & Solutions

### Issue 1: "command not found: docker-compose"

**Problem**: You're using Docker Compose v2 syntax.

**Solution**: Use `docker compose` (without hyphen) instead of `docker-compose`.

```bash
# ❌ Wrong (v1 syntax)
docker-compose up -d

# ✅ Correct (v2 syntax)
docker compose up -d
```

**Check your version**:
```bash
docker compose version
# Should show: Docker Compose version v2.x.x
```

---

### Issue 2: "Cannot connect to the Docker daemon"

**Problem**: Docker Desktop/daemon is not running.

**Solution**:

#### macOS (Docker Desktop)
```bash
# Open Docker Desktop application
open -a Docker

# Wait for Docker to start (check system tray icon)
# Then verify:
docker ps
```

#### Linux
```bash
# Start Docker service
sudo systemctl start docker

# Enable on boot
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

#### Verify Docker is running
```bash
docker ps
# Should show running containers or empty list (not an error)
```

---

### Issue 3: "version is obsolete" warning

**Problem**: Docker Compose v2 doesn't need the `version` field.

**Solution**: The warning is harmless, but you can remove the `version: '3.8'` line from docker-compose.yml files.

**Status**: ✅ Already fixed in the project files.

---

### Issue 4: Port already in use

**Problem**: Port 3000 or 27017 is already in use.

**Solution**:

```bash
# Check what's using the port
lsof -i :3000
lsof -i :27017

# Kill the process or change ports in docker-compose.yml
# Edit ports: "3001:3000" to use port 3001 instead
```

---

### Issue 5: Permission denied

**Problem**: Docker requires sudo or user not in docker group.

**Solution**:

#### macOS/Windows
- Usually not needed with Docker Desktop

#### Linux
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and log back in, or:
newgrp docker

# Verify
docker ps
```

---

### Issue 6: MongoDB connection refused

**Problem**: MongoDB container not ready or not running.

**Solution**:

```bash
# Check MongoDB container status
docker compose ps mongodb

# Check MongoDB logs
docker compose logs mongodb

# Restart MongoDB
docker compose restart mongodb

# Wait for MongoDB to be ready
docker compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

---

### Issue 7: "No space left on device"

**Problem**: Docker disk space full.

**Solution**:

```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune

# Check disk space
df -h
```

---

## 🔧 Quick Fixes

### Restart Everything

```bash
# Stop all services
docker compose down

# Remove volumes (fresh start)
docker compose down -v

# Rebuild and start
docker compose build --no-cache
docker compose up -d
```

### Check Service Health

```bash
# Check all services
docker compose ps

# Check specific service logs
docker compose logs api
docker compose logs mongodb

# Follow logs in real-time
docker compose logs -f api
```

### Reset Database

```bash
# Stop services
docker compose down

# Remove MongoDB volume
docker volume rm masary_mongodb_data

# Start fresh
docker compose up -d
```

---

## 📋 Pre-Flight Checklist

Before running Docker commands, verify:

- [ ] Docker Desktop is running (macOS/Windows)
- [ ] Docker daemon is running (Linux: `sudo systemctl status docker`)
- [ ] Docker Compose is installed (`docker compose version`)
- [ ] Ports 3000 and 27017 are available
- [ ] Sufficient disk space (`df -h`)

---

## 🆘 Still Having Issues?

### Get System Information

```bash
# Docker version
docker --version
docker compose version

# System info
docker system info

# Running containers
docker ps -a

# Docker volumes
docker volume ls
```

### Common Commands

```bash
# Start Docker Desktop (macOS)
open -a Docker

# Check Docker status
docker info

# Test Docker
docker run hello-world

# List all containers
docker ps -a

# Remove all stopped containers
docker container prune

# View Docker disk usage
docker system df
```

---

## 📚 Additional Resources

- [Docker Desktop Documentation](https://docs.docker.com/desktop/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Troubleshooting](https://docs.docker.com/desktop/troubleshoot/)

---

## 💡 Pro Tips

1. **Use helper script**: `./scripts/docker-compose.sh` auto-detects your Docker Compose version
2. **Check logs first**: Always check `docker compose logs` when something fails
3. **Clean regularly**: Run `docker system prune` to free up space
4. **Use health checks**: Services have health checks configured
5. **Monitor resources**: Use `docker stats` to monitor resource usage

---

**Last Updated**: 2024



