# Masary API - Complete Project Structure Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Directory Structure](#directory-structure)
4. [File Descriptions](#file-descriptions)
5. [Design Patterns](#design-patterns)
6. [TypeScript Configuration](#typescript-configuration)
7. [Database Schema](#database-schema)
8. [API Endpoints](#api-endpoints)
9. [Authentication Flow](#authentication-flow)
10. [Migration System](#migration-system)
11. [Error Handling](#error-handling)
12. [Security Features](#security-features)

---

## 🎯 Project Overview

**Masary API** is a production-ready, enterprise-grade REST API built with:
- **Node.js** with **Express.js** framework
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** ODM
- **JWT** authentication
- Advanced design patterns and best practices

### Key Features
- ✅ Complete authentication system (register, login, password reset, email verification)
- ✅ TypeScript for type safety and better developer experience
- ✅ Database migration system
- ✅ Advanced error handling
- ✅ Request logging and monitoring
- ✅ API versioning
- ✅ Rate limiting
- ✅ Input validation
- ✅ Security best practices

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Routes → Controllers → Response)      │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Services → DTOs → Validation)        │
├─────────────────────────────────────────┤
│         Data Access Layer               │
│  (Repositories → Models)                │
├─────────────────────────────────────────┤
│         Infrastructure Layer           │
│  (Database → Utils → Middleware)        │
└─────────────────────────────────────────┘
```

### Request Flow

```
1. HTTP Request
   ↓
2. Middleware (Request ID, CORS, Helmet, Rate Limiting)
   ↓
3. Route Handler
   ↓
4. Validation Middleware
   ↓
5. Controller
   ↓
6. Service (Business Logic)
   ↓
7. Repository (Data Access)
   ↓
8. Database (MongoDB)
   ↓
9. Response (DTO → Formatter → JSON)
```

---

## 📁 Directory Structure

```
masary/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── database.ts         # MongoDB connection setup
│   │   └── env.ts              # Environment variables loader
│   │
│   ├── constants/              # Application constants
│   │   └── index.ts            # HTTP status, roles, messages, etc.
│   │
│   ├── controllers/            # Request handlers (Presentation Layer)
│   │   ├── AuthController.ts   # Authentication endpoints
│   │   └── HealthController.ts # Health check endpoints
│   │
│   ├── dto/                    # Data Transfer Objects
│   │   └── UserDTO.ts          # User data transformation
│   │
│   ├── errors/                 # Error handling
│   │   ├── AppError.ts         # Base error class
│   │   └── ErrorTypes.ts       # Custom error classes
│   │
│   ├── middleware/             # Express middleware
│   │   ├── asyncHandler.ts     # Async error wrapper
│   │   ├── auth.ts             # Authentication middleware
│   │   ├── errorHandler.ts     # Global error handler
│   │   ├── logger.ts          # Request logging
│   │   ├── requestId.ts        # Request ID generator
│   │   └── validation.ts      # Validation middleware
│   │
│   ├── migrations/             # Database migrations
│   │   ├── migrate.ts          # Migration runner
│   │   └── files/              # Migration files
│   │       ├── 1699123456789_create_users_table.ts
│   │       └── 1699123456790_create_migrations_table.ts
│   │
│   ├── models/                 # Mongoose models
│   │   ├── User.ts             # User model with schema
│   │   └── Migration.ts        # Migration tracking model
│   │
│   ├── repositories/           # Data access layer
│   │   └── UserRepository.ts   # User data operations
│   │
│   ├── routes/                 # API routes
│   │   ├── authRoutes.ts       # Authentication routes
│   │   ├── healthRoutes.ts     # Health check routes
│   │   └── v1/                 # API version 1
│   │       └── index.ts        # Version 1 route aggregator
│   │
│   ├── services/               # Business logic layer
│   │   └── AuthService.ts      # Authentication business logic
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── index.ts            # Shared types and interfaces
│   │   └── express.d.ts       # Express type extensions
│   │
│   ├── utils/                  # Utility functions
│   │   ├── email.ts            # Email sending utilities
│   │   ├── helpers.ts          # General helper functions
│   │   ├── jwt.ts              # JWT token utilities
│   │   ├── logger.ts           # Advanced logging utility
│   │   ├── pagination.ts        # Pagination utilities
│   │   ├── queryBuilder.ts     # MongoDB query builder
│   │   ├── response.ts         # Response formatter
│   │   └── transaction.ts     # Database transaction wrapper
│   │
│   ├── validators/              # Input validation rules
│   │   └── authValidator.ts    # Authentication validators
│   │
│   └── server.ts               # Application entry point
│
├── .gitignore                  # Git ignore rules
├── env.template                # Environment variables template
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── README.md                    # Project documentation
├── ARCHITECTURE.md              # Architecture documentation
├── MIGRATION_GUIDE.md          # Migration system guide
└── PROJECT_STRUCTURE.md        # This file
```

---

## 📄 File Descriptions

### Configuration Files

#### `src/config/database.ts`
- **Purpose**: MongoDB connection setup
- **Exports**: `connectDB()` function
- **Features**: 
  - Connection pooling
  - Error handling
  - Logging

#### `src/config/env.ts`
- **Purpose**: Environment variables configuration
- **Exports**: `Config` object with typed environment variables
- **Includes**: Port, database URI, JWT secrets, email config

### Models

#### `src/models/User.ts`
- **Purpose**: User data model and schema
- **Exports**: `User` model and `IUser` interface
- **Features**:
  - Password hashing (pre-save hook)
  - Password comparison method
  - Token generation methods
  - Email validation
  - Role-based access control

#### `src/models/Migration.ts`
- **Purpose**: Track executed database migrations
- **Exports**: `Migration` model
- **Fields**: name, timestamp, executedAt

### Repositories

#### `src/repositories/UserRepository.ts`
- **Purpose**: Data access layer for users
- **Pattern**: Repository Pattern
- **Methods**:
  - `create()` - Create new user
  - `findByEmail()` - Find user by email
  - `findById()` - Find user by ID
  - `findByPasswordResetToken()` - Find by reset token
  - `findByEmailVerificationToken()` - Find by verification token
  - `update()` - Update user
  - `delete()` - Delete user
  - `emailExists()` - Check email existence
  - `findAll()` - Get all users (paginated)
  - `count()` - Count total users

### Services

#### `src/services/AuthService.ts`
- **Purpose**: Authentication business logic
- **Pattern**: Service Layer Pattern
- **Methods**:
  - `register()` - User registration
  - `login()` - User login
  - `refreshToken()` - Refresh access token
  - `logout()` - User logout
  - `forgotPassword()` - Request password reset
  - `resetPassword()` - Reset password with token
  - `verifyEmail()` - Verify email address
  - `resendVerificationEmail()` - Resend verification email
  - `changePassword()` - Change password (authenticated)

### Controllers

#### `src/controllers/AuthController.ts`
- **Purpose**: Handle authentication HTTP requests
- **Pattern**: MVC Controller
- **Methods**: All async handlers for auth endpoints
- **Features**: Uses response formatter and DTOs

#### `src/controllers/HealthController.ts`
- **Purpose**: Health check endpoints
- **Methods**:
  - `health()` - Basic health check
  - `healthCheck()` - Detailed health check with DB status

### Middleware

#### `src/middleware/auth.ts`
- **Purpose**: Authentication and authorization
- **Exports**:
  - `protect` - Require authentication
  - `restrictTo()` - Role-based access control
  - `optionalAuth` - Optional authentication

#### `src/middleware/errorHandler.ts`
- **Purpose**: Global error handling
- **Features**:
  - Custom error classes
  - Development vs production error responses
  - Request ID tracking
  - Error logging

#### `src/middleware/validation.ts`
- **Purpose**: Input validation
- **Uses**: express-validator
- **Exports**: `validate` middleware

#### `src/middleware/logger.ts`
- **Purpose**: Request/response logging
- **Features**: Response time tracking, structured logging

#### `src/middleware/requestId.ts`
- **Purpose**: Generate unique request IDs
- **Features**: UUID generation, header setting

#### `src/middleware/asyncHandler.ts`
- **Purpose**: Wrap async functions to catch errors
- **Pattern**: Error handling wrapper

### Routes

#### `src/routes/authRoutes.ts`
- **Purpose**: Authentication route definitions
- **Routes**:
  - Public: register, login, refresh-token, forgot-password, reset-password, verify-email, resend-verification
  - Protected: logout, me, change-password

#### `src/routes/healthRoutes.ts`
- **Purpose**: Health check routes
- **Routes**: `/`, `/detailed`

#### `src/routes/v1/index.ts`
- **Purpose**: API version 1 route aggregator
- **Features**: Rate limiting, version info endpoint

### Utilities

#### `src/utils/jwt.ts`
- **Purpose**: JWT token operations
- **Functions**:
  - `generateToken()` - Generate access token
  - `generateRefreshToken()` - Generate refresh token
  - `verifyToken()` - Verify access token
  - `verifyRefreshToken()` - Verify refresh token
  - `generateTokens()` - Generate both tokens

#### `src/utils/email.ts`
- **Purpose**: Email sending functionality
- **Functions**:
  - `sendEmail()` - Generic email sender
  - `sendPasswordResetEmail()` - Password reset email
  - `sendEmailVerificationEmail()` - Verification email

#### `src/utils/response.ts`
- **Purpose**: Standardized API responses
- **Class**: `ResponseFormatter`
- **Methods**:
  - `success()` - Success response
  - `created()` - Created response
  - `noContent()` - No content response
  - `paginated()` - Paginated response
  - `error()` - Error response

#### `src/utils/logger.ts`
- **Purpose**: Structured logging
- **Class**: `Logger`
- **Methods**: `info()`, `error()`, `warn()`, `debug()`, `request()`

#### `src/utils/pagination.ts`
- **Purpose**: Pagination utilities
- **Functions**:
  - `parsePagination()` - Parse pagination params
  - `parseSort()` - Parse sort params
  - `parseFilters()` - Parse filter params
  - `buildPaginationMeta()` - Build pagination metadata

#### `src/utils/queryBuilder.ts`
- **Purpose**: Advanced MongoDB query building
- **Class**: `QueryBuilder`
- **Methods**: `filter()`, `search()`, `sort()`, `limitFields()`, `paginate()`

#### `src/utils/transaction.ts`
- **Purpose**: Database transaction wrapper
- **Function**: `withTransaction()` - Execute function in transaction

#### `src/utils/helpers.ts`
- **Purpose**: General helper functions
- **Functions**:
  - `sanitizeObject()` - Remove sensitive fields
  - `generateRandomString()` - Generate random string
  - `sleep()` - Delay function
  - `isEmpty()` - Check if value is empty
  - `deepClone()` - Deep clone object
  - `formatDate()` - Format date

### DTOs

#### `src/dto/UserDTO.ts`
- **Purpose**: User data transformation
- **Class**: `UserDTO`
- **Methods**:
  - `toResponse()` - Transform to safe response
  - `toResponseList()` - Transform array of users
  - `toRegistrationResponse()` - Registration response
  - `toLoginResponse()` - Login response

### Types

#### `src/types/index.ts`
- **Purpose**: TypeScript type definitions
- **Exports**:
  - `IUser` - User interface
  - `AuthRequest` - Authenticated request
  - `ApiResponse` - API response format
  - `ValidationError` - Validation error
  - `PaginationMeta` - Pagination metadata
  - `JWTPayload` - JWT payload
  - `TokenPair` - Token pair
  - `RegisterData`, `LoginData`, `ChangePasswordData`
  - `Config` - Configuration type
  - And more...

#### `src/types/express.d.ts`
- **Purpose**: Extend Express types
- **Features**: Adds `user` and `id` to Request

### Errors

#### `src/errors/AppError.ts`
- **Purpose**: Base error class
- **Properties**: statusCode, status, isOperational, timestamp

#### `src/errors/ErrorTypes.ts`
- **Purpose**: Custom error classes
- **Classes**:
  - `BadRequestError` (400)
  - `UnauthorizedError` (401)
  - `ForbiddenError` (403)
  - `NotFoundError` (404)
  - `ConflictError` (409)
  - `ValidationError` (422)
  - `InternalServerError` (500)
  - `ServiceUnavailableError` (503)

### Validators

#### `src/validators/authValidator.ts`
- **Purpose**: Input validation rules for authentication
- **Exports**:
  - `registerValidator`
  - `loginValidator`
  - `forgotPasswordValidator`
  - `resetPasswordValidator`
  - `changePasswordValidator`
  - `refreshTokenValidator`

### Constants

#### `src/constants/index.ts`
- **Purpose**: Application constants
- **Exports**:
  - `HTTP_STATUS` - HTTP status codes
  - `USER_ROLES` - User roles
  - `USER_STATUS` - User statuses
  - `TOKEN_TYPES` - Token types
  - `PAGINATION` - Pagination defaults
  - `SORT_ORDER` - Sort orders
  - `DATE_FORMATS` - Date formats
  - `MESSAGES` - Response messages
  - `ERROR_CODES` - Error codes

### Main Entry Point

#### `src/server.ts`
- **Purpose**: Application entry point
- **Features**:
  - Express app setup
  - Middleware configuration
  - Route registration
  - Error handling
  - Server startup
  - Graceful shutdown

---

## 🎨 Design Patterns

### 1. **Repository Pattern**
- **Location**: `src/repositories/`
- **Purpose**: Abstract data access layer
- **Benefits**: Testability, maintainability, database independence

### 2. **Service Layer Pattern**
- **Location**: `src/services/`
- **Purpose**: Business logic encapsulation
- **Benefits**: Reusability, separation of concerns

### 3. **MVC Pattern**
- **Components**:
  - Models: `src/models/`
  - Views: Response formatters (DTOs)
  - Controllers: `src/controllers/`

### 4. **DTO Pattern**
- **Location**: `src/dto/`
- **Purpose**: Safe data transformation
- **Benefits**: Security, consistency

### 5. **Middleware Pattern**
- **Location**: `src/middleware/`
- **Purpose**: Cross-cutting concerns
- **Examples**: Auth, validation, logging, error handling

### 6. **Factory Pattern**
- **Location**: Error classes, response formatters
- **Purpose**: Object creation

### 7. **Singleton Pattern**
- **Location**: Services, repositories
- **Purpose**: Single instance per application

### 8. **Builder Pattern**
- **Location**: `src/utils/queryBuilder.ts`
- **Purpose**: Complex query construction

---

## ⚙️ TypeScript Configuration

### `tsconfig.json`
- **Target**: ES2022
- **Module**: ESNext
- **Strict Mode**: Enabled
- **Features**:
  - Source maps
  - Declaration files
  - Path aliases
  - Decorator support

### Type Safety
- All files are fully typed
- Interfaces for all data structures
- Type-safe Express requests/responses
- Generic types for utilities

---

## 🗄️ Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, lowercase),
  password: String (required, min 6, hashed),
  role: String (enum: 'user' | 'admin' | 'moderator', default: 'user'),
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String (optional),
  emailVerificationExpire: Date (optional),
  passwordResetToken: String (optional),
  passwordResetExpire: Date (optional),
  refreshToken: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Indexes
- `email`: Unique index
- `role`: Index
- `isActive`: Index
- `createdAt`: Descending index
- Compound: `(isActive, role)`

### Migrations Collection

```typescript
{
  _id: ObjectId,
  name: String (required, unique),
  timestamp: Number (required),
  executedAt: Date (default: now),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🔌 API Endpoints

### Base URL
- Development: `http://localhost:3000`
- API Version: `/api/v1`

### Health Check
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health with DB status

### Authentication (Public)
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/verify-email/:token` - Verify email
- `POST /api/v1/auth/resend-verification` - Resend verification email

### Authentication (Protected)
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/change-password` - Change password

---

## 🔐 Authentication Flow

### Registration Flow
```
1. User submits registration data
2. Validation middleware checks input
3. AuthService checks if user exists
4. Create user with hashed password
5. Generate email verification token
6. Generate JWT tokens
7. Send verification email (optional)
8. Return user data and tokens
```

### Login Flow
```
1. User submits credentials
2. Validation middleware checks input
3. AuthService finds user by email
4. Verify password
5. Check if user is active
6. Generate JWT tokens
7. Save refresh token
8. Return user data and tokens
```

### Token Refresh Flow
```
1. User sends refresh token
2. Verify refresh token
3. Find user with matching refresh token
4. Generate new access token
5. Return new access token
```

### Password Reset Flow
```
1. User requests password reset
2. Generate reset token
3. Save hashed token with expiration
4. Send reset email
5. User clicks link and submits new password
6. Verify reset token
7. Update password
8. Clear reset token
```

---

## 🔄 Migration System

### Migration Files Location
`src/migrations/files/`

### Naming Convention
`{timestamp}_{description}.ts`

### Migration Structure
```typescript
export const up = async (): Promise<void> => {
  // Migration logic
};

export const down = async (): Promise<void> => {
  // Rollback logic
};
```

### Commands
- `npm run migrate:up` - Run pending migrations
- `npm run migrate:down` - Rollback last migration
- `npm run migrate:status` - Check migration status

### Migration Tracking
- Stored in `migrations` collection
- Prevents duplicate execution
- Tracks execution timestamp

---

## ⚠️ Error Handling

### Error Class Hierarchy
```
AppError (Base)
├── BadRequestError (400)
├── UnauthorizedError (401)
├── ForbiddenError (403)
├── NotFoundError (404)
├── ConflictError (409)
├── ValidationError (422)
├── InternalServerError (500)
└── ServiceUnavailableError (503)
```

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
  "requestId": "uuid",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Flow
1. Service throws custom error
2. Error propagates through middleware
3. Error handler catches and formats
4. Logger records error with context
5. Response sent to client

---

## 🔒 Security Features

### Authentication
- JWT tokens (access + refresh)
- Password hashing with bcrypt
- Token expiration
- Refresh token rotation

### Authorization
- Role-based access control
- Protected routes
- Optional authentication

### Input Validation
- express-validator
- Custom validation rules
- Sanitization

### Security Headers
- Helmet.js
- CORS configuration
- Rate limiting

### Data Protection
- DTOs remove sensitive fields
- Password never returned in responses
- Secure token storage

---

## 📊 Logging

### Log Levels
- **Info**: General information
- **Warn**: Warnings
- **Error**: Errors with stack traces
- **Debug**: Development-only detailed logs

### Log Format
- Structured JSON
- Includes timestamp, level, message, context
- Request ID for correlation

### Logged Events
- HTTP requests (method, URL, status, response time)
- Errors (with stack traces in dev)
- Authentication events
- Database operations

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Environment Setup
```bash
cp env.template .env
# Edit .env with your configuration
```

### Build
```bash
npm run build
```

### Run Migrations
```bash
npm run migrate:up
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

---

## 📝 Scripts

- `npm run build` - Compile TypeScript
- `npm start` - Run compiled code
- `npm run dev` - Development with hot reload
- `npm run type-check` - Check TypeScript types
- `npm run migrate` - Run migrations
- `npm run migrate:up` - Run pending migrations
- `npm run migrate:down` - Rollback migrations
- `npm run migrate:status` - Check migration status
- `npm run clean` - Remove dist folder

---

## 🧪 Testing (Future)

### Planned Test Structure
- Unit tests for services
- Integration tests for repositories
- E2E tests for API endpoints
- Test utilities and fixtures

---

## 📚 Additional Documentation

- **README.md** - Project overview and quick start
- **ARCHITECTURE.md** - Detailed architecture documentation
- **MIGRATION_GUIDE.md** - Migration system guide
- **PROJECT_STRUCTURE.md** - This file

---

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - Access token expiration
- `JWT_REFRESH_SECRET` - Refresh token secret
- `JWT_REFRESH_EXPIRE` - Refresh token expiration
- `EMAIL_*` - Email configuration
- `FRONTEND_URL` - Frontend URL for email links

---

## 📈 Performance Considerations

- Database connection pooling
- Query optimization with indexes
- Pagination for large datasets
- Rate limiting to prevent abuse
- Response caching ready
- Async operations throughout

---

## 🎯 Best Practices Implemented

- ✅ TypeScript for type safety
- ✅ Layered architecture
- ✅ Separation of concerns
- ✅ Error handling
- ✅ Input validation
- ✅ Security best practices
- ✅ Logging and monitoring
- ✅ API versioning
- ✅ Database migrations
- ✅ Code organization
- ✅ Documentation

---

**Last Updated**: 2024
**Version**: 1.0.0
**License**: ISC

