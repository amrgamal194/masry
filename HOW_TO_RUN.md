# 🚀 How to Run Masary API

## Method 1: Using Docker (Recommended - Easiest)

### Step 1: Start Docker Desktop

**macOS:**
```bash
# Open Docker Desktop
open -a Docker

# Or use the helper script
./scripts/start-docker.sh

# Wait 30-60 seconds for Docker to start
# Verify Docker is running:
docker ps
```

**Windows:**
- Open Docker Desktop from Start Menu
- Wait for it to start (check system tray)

**Linux:**
```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Step 2: Start All Services

```bash
# Start MongoDB and API
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f api
```

### Step 3: Test the API

```bash
# Health check
curl http://localhost:3000/health

# Or open in browser
open http://localhost:3000/health
```

### Step 4: Access Services

- **API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Mongo Express** (optional): http://localhost:8081

---

## Method 2: Manual Setup (Without Docker)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp env.template .env

# Edit .env file with your settings:
# - MONGODB_URI (default: mongodb://localhost:27017/masary_db)
# - JWT_SECRET (use a strong secret)
# - JWT_REFRESH_SECRET (use a strong secret)
```

### Step 3: Start MongoDB

**Option A: Using Docker (just MongoDB)**
```bash
docker run -d \
  --name masary-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:7.0
```

**Option B: Local MongoDB Installation**
```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services
```

### Step 4: Run Migrations

```bash
npm run migrate:up
```

### Step 5: Build TypeScript

```bash
npm run build
```

### Step 6: Start the Server

**Development Mode (with hot reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### Step 7: Test the API

```bash
# Health check
curl http://localhost:3000/health

# Or open in browser
open http://localhost:3000/health
```

---

## 🎯 Quick Start Commands

### Docker Method (All-in-One)

```bash
# 1. Start Docker Desktop (if not running)
open -a Docker  # macOS
# Wait 30-60 seconds

# 2. Start services
docker compose up -d

# 3. Check logs
docker compose logs -f api

# 4. Test API
curl http://localhost:3000/health
```

### Manual Method

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp env.template .env
# Edit .env with your MongoDB URI

# 3. Start MongoDB (if not using Docker)
# See Step 3 above

# 4. Run migrations
npm run migrate:up

# 5. Start development server
npm run dev
```

---

## 📋 Pre-Run Checklist

### For Docker Method:
- [ ] Docker Desktop is installed and running
- [ ] Ports 3000 and 27017 are available
- [ ] Internet connection (to pull images)

### For Manual Method:
- [ ] Node.js 18+ installed (`node -v`)
- [ ] MongoDB installed and running
- [ ] Port 3000 is available
- [ ] `.env` file configured

---

## 🔍 Verify Installation

### Check Node.js
```bash
node -v  # Should be 18 or higher
npm -v
```

### Check MongoDB (Manual Method)
```bash
# Test connection
mongosh --eval "db.adminCommand('ping')"

# Or using Docker
docker exec masary-mongodb mongosh --eval "db.adminCommand('ping')"
```

### Check API
```bash
# Health endpoint
curl http://localhost:3000/health

# Expected response:
# {"success":true,"message":"Service is healthy",...}
```

---

## 🛠️ Common Commands

### Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f api

# Restart API
docker compose restart api

# Rebuild after code changes
docker compose build api
docker compose up -d
```

### Development Commands

```bash
# Start dev server (hot reload)
npm run dev

# Build TypeScript
npm run build

# Run migrations
npm run migrate:up

# Check types
npm run type-check
```

---

## 🧪 Test API Endpoints

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Get Current User (Protected)
```bash
# Replace YOUR_TOKEN with token from login response
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
lsof -i :3000

# Kill the process or change port in .env
# PORT=3001
```

### MongoDB Connection Error

**Docker Method:**
```bash
# Check MongoDB container
docker compose ps mongodb
docker compose logs mongodb

# Restart MongoDB
docker compose restart mongodb
```

**Manual Method:**
```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Docker Not Starting

```bash
# Check Docker status
docker ps

# If error, start Docker Desktop
open -a Docker  # macOS

# Wait 30-60 seconds, then verify
docker ps
```

### TypeScript Build Errors

```bash
# Check for type errors
npm run type-check

# Clean and rebuild
npm run clean
npm run build
```

---

## 📊 Monitor Running Services

### Docker Method

```bash
# View all services
docker compose ps

# View API logs
docker compose logs -f api

# View MongoDB logs
docker compose logs -f mongodb

# Resource usage
docker stats
```

### Manual Method

```bash
# Check Node process
ps aux | grep node

# Check MongoDB process
ps aux | grep mongod

# View API logs (in terminal where npm run dev is running)
```

---

## 🎯 Next Steps After Running

1. **Test API Endpoints**
   - Register a user
   - Login
   - Test protected endpoints

2. **Check Database**
   - Verify users collection
   - Check migrations collection

3. **Review Logs**
   - Check for any errors
   - Verify requests are being logged

4. **API Documentation**
   - See `README.md` for all endpoints
   - See `QUICK_REFERENCE.md` for quick commands

---

## 📚 Additional Resources

- **Quick Reference**: `QUICK_REFERENCE.md`
- **Docker Guide**: `DOCKER_GUIDE.md`
- **Troubleshooting**: `DOCKER_TROUBLESHOOTING.md`
- **API Documentation**: `README.md`
- **Project Structure**: `PROJECT_STRUCTURE.md`

---

## ✅ Success Indicators

You'll know the project is running correctly when:

1. ✅ Health check returns `200 OK`
2. ✅ API logs show "Server running in development mode"
3. ✅ MongoDB connection is established
4. ✅ You can register and login users
5. ✅ Protected endpoints work with JWT tokens

---

**Happy Coding! 🚀**



