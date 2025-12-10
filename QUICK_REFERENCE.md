# Masary API - Quick Reference Guide

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp env.template .env
# Edit .env with your settings

# 3. Run migrations
npm run migrate:up

# 4. Start development server
npm run dev
```

## 📁 Project Structure at a Glance

```
masary/
├── src/
│   ├── config/          → Database & environment config
│   ├── constants/       → HTTP status, roles, messages
│   ├── controllers/     → HTTP request handlers
│   ├── dto/            → Data transformation objects
│   ├── errors/         → Custom error classes
│   ├── middleware/     → Express middleware
│   ├── migrations/     → Database migrations
│   ├── models/         → Mongoose schemas
│   ├── repositories/   → Data access layer
│   ├── routes/         → API route definitions
│   ├── services/       → Business logic
│   ├── types/          → TypeScript types
│   ├── utils/          → Utility functions
│   ├── validators/     → Input validation
│   └── server.ts       → App entry point
```

## 🔑 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `server.ts` | Main entry point, Express app setup |
| `config/database.ts` | MongoDB connection |
| `config/env.ts` | Environment variables |
| `models/User.ts` | User schema & interface |
| `repositories/UserRepository.ts` | User data operations |
| `services/AuthService.ts` | Authentication business logic |
| `controllers/AuthController.ts` | Auth HTTP handlers |
| `middleware/auth.ts` | Authentication middleware |
| `middleware/errorHandler.ts` | Global error handler |
| `utils/jwt.ts` | JWT token operations |
| `utils/response.ts` | Standardized responses |
| `dto/UserDTO.ts` | User data transformation |

## 📡 API Endpoints

### Public Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/verify-email/:token
POST   /api/v1/auth/resend-verification
```

### Protected Endpoints (Require Bearer Token)
```
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/change-password
```

### Health Check
```
GET    /health
GET    /health/detailed
```

## 🔐 Authentication

### Register
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "access_token",
    "refreshToken": "refresh_token"
  }
}
```

### Use Token
```
Authorization: Bearer <access_token>
```

## 🗄️ Database Collections

### users
- Stores user accounts
- Indexes: email (unique), role, isActive, createdAt

### migrations
- Tracks executed migrations
- Prevents duplicate execution

## 🔄 Migration Commands

```bash
npm run migrate:up      # Run pending migrations
npm run migrate:down    # Rollback last migration
npm run migrate:status  # Check migration status
```

## 📝 NPM Scripts

```bash
npm run build          # Compile TypeScript
npm start              # Run production server
npm run dev            # Development with hot reload
npm run type-check     # Check TypeScript types
npm run migrate        # Run migrations
npm run clean          # Remove dist folder
```

## 🎨 Design Patterns Used

1. **Repository Pattern** - Data access abstraction
2. **Service Layer** - Business logic
3. **MVC** - Model-View-Controller
4. **DTO** - Data Transfer Objects
5. **Middleware** - Cross-cutting concerns
6. **Factory** - Error classes
7. **Singleton** - Services/Repositories
8. **Builder** - Query builder

## ⚙️ Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/masary_db
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-password
FRONTEND_URL=http://localhost:3000
```

## 🛡️ Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Request sanitization

## 📊 Response Format

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ],
  "requestId": "uuid",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔍 Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error
- `503` - Service Unavailable

## 📚 Documentation Files

- `README.md` - Project overview
- `PROJECT_STRUCTURE.md` - Complete structure documentation
- `ARCHITECTURE.md` - Architecture details
- `MIGRATION_GUIDE.md` - Migration system guide
- `QUICK_REFERENCE.md` - This file

## 🧪 Testing API

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get Current User
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import collection (if available)
2. Set base URL: `http://localhost:3000`
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB is running
- Verify connection string format

### TypeScript Errors
```bash
npm run type-check  # Check for type errors
npm run build       # Try building
```

### Migration Issues
```bash
npm run migrate:status  # Check migration status
# If needed, manually fix migrations collection
```

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using port 3000

## 📦 Dependencies

### Production
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT tokens
- express-validator - Input validation
- cors - CORS middleware
- helmet - Security headers
- express-rate-limit - Rate limiting
- nodemailer - Email sending
- dotenv - Environment variables

### Development
- typescript - TypeScript compiler
- tsx - TypeScript execution
- @types/* - TypeScript definitions

## 🎯 Next Steps

1. **Add More Features**
   - User profile management
   - File uploads
   - Additional resources

2. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

3. **Deployment**
   - Docker setup
   - CI/CD pipeline
   - Production configuration

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Log aggregation

## 📞 Support

For detailed information, see:
- `PROJECT_STRUCTURE.md` - Complete structure
- `ARCHITECTURE.md` - Architecture details
- `MIGRATION_GUIDE.md` - Migration system



