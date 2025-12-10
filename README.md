# Masary REST API

A **production-ready, enterprise-grade** REST API built with Node.js, Express.js, and MongoDB, implementing advanced design patterns, comprehensive authentication, and best practices.

## 🚀 Features

### **Advanced Architecture & Design Patterns**
- ✅ **MVC (Model-View-Controller)** - Clean separation of concerns
- ✅ **Repository Pattern** - Abstracted data access layer
- ✅ **Service Layer** - Business logic encapsulation
- ✅ **DTO (Data Transfer Objects)** - Safe data transformation
- ✅ **API Versioning** - Future-proof API structure
- ✅ **Dependency Injection** - Loose coupling

### **Complete Authentication System**
- ✅ User registration with email validation
- ✅ User login with JWT tokens
- ✅ Refresh token mechanism
- ✅ Password reset functionality
- ✅ Email verification
- ✅ Change password (authenticated users)
- ✅ Protected routes with role-based access control
- ✅ Optional authentication middleware

### **Advanced Features**
- ✅ **Structured Error Handling** - Custom error classes with proper HTTP status codes
- ✅ **Request Logging** - Comprehensive request/response logging
- ✅ **Request ID Tracking** - Track requests across the system
- ✅ **Response Formatting** - Standardized API responses
- ✅ **Pagination Utilities** - Built-in pagination support
- ✅ **Query Builder** - Advanced MongoDB query building
- ✅ **Transaction Support** - Database transaction utilities
- ✅ **Health Check Endpoints** - System monitoring
- ✅ **Constants & Enums** - Centralized configuration

### **Security Features**
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Rate limiting (general + strict auth limits)
- ✅ Helmet.js for security headers
- ✅ Input validation with express-validator
- ✅ CORS configuration
- ✅ Request sanitization

## 📁 Advanced Project Structure

```
masary/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.js      # MongoDB connection
│   │   └── env.js           # Environment variables
│   ├── constants/           # Constants and enums
│   │   └── index.js         # HTTP status, roles, messages, etc.
│   ├── controllers/         # Request handlers (Controller layer)
│   │   ├── AuthController.js
│   │   └── HealthController.js
│   ├── dto/                 # Data Transfer Objects
│   │   └── UserDTO.js       # User data transformation
│   ├── errors/              # Error handling
│   │   ├── AppError.js      # Base error class
│   │   └── ErrorTypes.js    # Custom error classes
│   ├── middleware/          # Express middleware
│   │   ├── asyncHandler.js  # Async error handler
│   │   ├── auth.js          # Authentication middleware
│   │   ├── errorHandler.js  # Global error handler
│   │   ├── logger.js        # Request logging
│   │   ├── requestId.js     # Request ID generator
│   │   └── validation.js    # Validation middleware
│   ├── models/              # Mongoose models
│   │   └── User.js
│   ├── repositories/        # Data access layer (Repository pattern)
│   │   └── UserRepository.js
│   ├── routes/              # API routes
│   │   ├── v1/              # API version 1
│   │   │   └── index.js     # Version 1 routes
│   │   ├── authRoutes.js    # Authentication routes
│   │   └── healthRoutes.js  # Health check routes
│   ├── services/            # Business logic layer
│   │   └── AuthService.js
│   ├── utils/               # Utility functions
│   │   ├── email.js         # Email utilities
│   │   ├── helpers.js       # General helpers
│   │   ├── jwt.js           # JWT utilities
│   │   ├── logger.js        # Advanced logger
│   │   ├── pagination.js    # Pagination utilities
│   │   ├── queryBuilder.js  # MongoDB query builder
│   │   ├── response.js      # Response formatter
│   │   └── transaction.js    # Transaction utilities
│   ├── validators/          # Input validation rules
│   │   └── authValidator.js
│   └── server.js            # Application entry point
├── env.template             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Installation

### Option 1: Using Docker (Recommended)

```bash
# Start all services (MongoDB + API)
docker compose up -d

# View logs
docker compose logs -f api
```

**Note**: Use `docker compose` (v2) or `docker-compose` (v1) based on your installation.

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   cd masary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.template .env
   ```
   Edit `.env` and add your configuration:
   - MongoDB connection string
   - JWT secrets
   - Email configuration (optional)

4. **Run migrations**
   ```bash
   npm run migrate:up
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔌 API Endpoints

### Base URL
- Development: `http://localhost:3000`
- API Version: `/api/v1`

### Health Check

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health check with database status

### Authentication Routes

#### Public Routes

- `POST /api/v1/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/v1/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/v1/auth/refresh-token` - Refresh access token
  ```json
  {
    "refreshToken": "your-refresh-token"
  }
  ```

- `POST /api/v1/auth/forgot-password` - Request password reset
  ```json
  {
    "email": "john@example.com"
  }
  ```

- `POST /api/v1/auth/reset-password` - Reset password with token
  ```json
  {
    "token": "reset-token",
    "password": "newpassword123"
  }
  ```

- `GET /api/v1/auth/verify-email/:token` - Verify email address

- `POST /api/v1/auth/resend-verification` - Resend verification email
  ```json
  {
    "email": "john@example.com"
  }
  ```

#### Protected Routes (Require Authentication)

- `POST /api/v1/auth/logout` - Logout user
  - Headers: `Authorization: Bearer <token>`

- `GET /api/v1/auth/me` - Get current user
  - Headers: `Authorization: Bearer <token>`

- `POST /api/v1/auth/change-password` - Change password
  - Headers: `Authorization: Bearer <token>`
  ```json
  {
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }
  ```

## 📝 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Paginated Response

```json
{
  "success": true,
  "message": "Success",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "requestId": "uuid-here",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

### Token Structure

- **Access Token**: Short-lived (7 days by default)
- **Refresh Token**: Long-lived (30 days by default)

### Using Tokens

1. **Login/Register** - Receive both `token` and `refreshToken`
2. **Access Protected Routes** - Use `token` in Authorization header
3. **Refresh Token** - Use `refreshToken` to get new `token` when expired

## 🏗️ Advanced Design Patterns & Architecture

### Design Patterns

1. **Repository Pattern** - Separates data access logic from business logic
2. **Service Layer** - Contains business logic and orchestrates repository calls
3. **MVC Pattern** - Clear separation of concerns (Models, Views/Controllers, Routes)
4. **Middleware Pattern** - Cross-cutting concerns (auth, validation, error handling)
5. **DTO Pattern** - Data Transfer Objects for safe data transformation
6. **Factory Pattern** - Error classes and response formatters
7. **Singleton Pattern** - Services and repositories as singletons
8. **Builder Pattern** - Query builder for complex MongoDB queries

### Architecture Layers

```
┌─────────────────────────────────────┐
│         Controllers Layer           │  ← Request handling, response formatting
├─────────────────────────────────────┤
│         Services Layer              │  ← Business logic, orchestration
├─────────────────────────────────────┤
│      Repositories Layer             │  ← Data access abstraction
├─────────────────────────────────────┤
│         Models Layer                │  ← Database schemas
└─────────────────────────────────────┘
```

### Error Handling Strategy

- **Custom Error Classes**: `BadRequestError`, `UnauthorizedError`, `NotFoundError`, etc.
- **Centralized Error Handler**: Global error handling middleware
- **Structured Error Responses**: Consistent error format
- **Request ID Tracking**: Track errors across requests
- **Development vs Production**: Different error detail levels

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/masary_db

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_FROM=noreply@masary.com

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

## 🛡️ Advanced Error Handling

The API uses a sophisticated error handling system:

- **Custom Error Classes**: Type-specific errors with proper HTTP status codes
- **Operational vs Programming Errors**: Different handling strategies
- **Request ID Tracking**: Every error includes request ID for debugging
- **Structured Error Responses**: Consistent error format across the API
- **Development Mode**: Full stack traces and error details
- **Production Mode**: User-friendly messages, hidden sensitive details
- **Error Logging**: All errors are logged with context

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "requestId": "uuid-here",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Best Practices

- ✅ **Password Security**: Bcrypt hashing with salt rounds
- ✅ **JWT Authentication**: Access tokens + refresh tokens
- ✅ **Rate Limiting**: 
  - General API: 100 requests/15min
  - Auth endpoints: 5 requests/15min
- ✅ **Input Validation**: express-validator with custom rules
- ✅ **Security Headers**: Helmet.js configuration
- ✅ **CORS**: Configurable CORS policy
- ✅ **Environment Variables**: Secure configuration management
- ✅ **Request Sanitization**: DTOs remove sensitive data
- ✅ **Error Message Security**: No sensitive data in production errors

## 📊 Logging & Monitoring

- **Structured Logging**: JSON format logs
- **Request Logging**: All HTTP requests logged with timing
- **Error Logging**: Comprehensive error logging with context
- **Request ID**: Track requests across the system
- **Health Checks**: Monitor system status
- **Development Logging**: Debug-level logging in dev mode

## 🚀 Performance Features

- **Query Optimization**: Advanced query builder
- **Pagination**: Built-in pagination utilities
- **Database Indexing**: Optimized MongoDB queries
- **Response Caching**: Ready for Redis integration
- **Transaction Support**: Database transaction utilities

## License

ISC

