# Architecture Documentation

## System Architecture Overview

This document describes the advanced architecture and design decisions of the Masary REST API.

## Architecture Layers

### 1. Controllers Layer
**Purpose**: Handle HTTP requests and responses

**Responsibilities**:
- Parse and validate incoming requests
- Call appropriate service methods
- Format responses using DTOs
- Handle HTTP status codes

**Location**: `src/controllers/`

**Example**:
```javascript
class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    return responseFormatter.created(res, result);
  });
}
```

### 2. Services Layer
**Purpose**: Business logic and orchestration

**Responsibilities**:
- Implement business rules
- Orchestrate multiple repository calls
- Handle transactions
- Transform data using DTOs
- Throw domain-specific errors

**Location**: `src/services/`

**Example**:
```javascript
class AuthService {
  async register(userData) {
    // Business logic here
    const user = await userRepository.create(userData);
    // More business logic
    return UserDTO.toRegistrationResponse(user, tokens);
  }
}
```

### 3. Repositories Layer
**Purpose**: Data access abstraction

**Responsibilities**:
- Abstract database operations
- Provide clean interface for data access
- Handle database-specific logic
- Return domain models

**Location**: `src/repositories/`

**Example**:
```javascript
class UserRepository {
  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    return includePassword ? query.select('+password') : query;
  }
}
```

### 4. Models Layer
**Purpose**: Data structure definitions

**Responsibilities**:
- Define database schemas
- Define model methods
- Handle data validation at model level
- Define relationships

**Location**: `src/models/`

## Design Patterns

### Repository Pattern
**Why**: Separates data access from business logic, making code testable and maintainable.

**Implementation**: Each entity has a repository that handles all database operations.

### Service Layer Pattern
**Why**: Centralizes business logic, making it reusable and testable.

**Implementation**: Services orchestrate repository calls and implement business rules.

### DTO Pattern
**Why**: Provides safe data transformation, removing sensitive fields and standardizing responses.

**Implementation**: DTOs transform domain models to safe response objects.

### Middleware Pattern
**Why**: Handles cross-cutting concerns like authentication, logging, and error handling.

**Implementation**: Express middleware functions that process requests before/after handlers.

## Error Handling Strategy

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

### Error Flow

1. **Service throws domain error** → Custom error class
2. **Error propagates** → Through middleware
3. **Error handler catches** → Formats response
4. **Logger records** → With context and request ID

## Request Flow

```
1. Request arrives
   ↓
2. Request ID middleware (adds unique ID)
   ↓
3. Security middleware (helmet, CORS)
   ↓
4. Rate limiting
   ↓
5. Body parsing
   ↓
6. Request logging
   ↓
7. Route handler
   ↓
8. Validation middleware
   ↓
9. Controller
   ↓
10. Service (business logic)
   ↓
11. Repository (data access)
   ↓
12. Response formatting
   ↓
13. Error handling (if error occurred)
```

## Security Architecture

### Authentication Flow

1. User provides credentials
2. Service validates credentials
3. Generate JWT tokens (access + refresh)
4. Store refresh token in database
5. Return tokens to client
6. Client uses access token for requests
7. Middleware validates token on protected routes

### Authorization

- **Role-based**: Using `restrictTo()` middleware
- **Resource-based**: Can be extended for fine-grained control

## Database Architecture

### Connection Management
- Single MongoDB connection pool
- Automatic reconnection
- Connection state monitoring

### Transaction Support
- Wrapper utility for transactions
- Automatic rollback on errors
- Session management

## Logging Architecture

### Log Levels
- **Info**: General information
- **Warn**: Warnings
- **Error**: Errors with stack traces
- **Debug**: Development-only detailed logs

### Log Format
- Structured JSON format
- Includes timestamp, level, message, context
- Request ID for correlation

## API Versioning

### Strategy
- URL-based versioning: `/api/v1/`
- Allows multiple versions to coexist
- Easy to deprecate old versions

### Structure
```
routes/
├── v1/
│   └── index.js
└── v2/ (future)
    └── index.js
```

## Performance Considerations

### Query Optimization
- Query builder for complex queries
- Indexed fields in models
- Pagination to limit results

### Caching Strategy
- Ready for Redis integration
- Response caching can be added
- Query result caching possible

### Rate Limiting
- General API: 100 req/15min
- Auth endpoints: 5 req/15min
- Prevents abuse and DoS

## Testing Strategy (Future)

### Unit Tests
- Services
- Repositories
- Utilities

### Integration Tests
- API endpoints
- Database operations
- Authentication flows

### E2E Tests
- Complete user flows
- Error scenarios

## Deployment Considerations

### Environment Configuration
- Separate configs for dev/staging/prod
- Environment variables for secrets
- Feature flags support

### Monitoring
- Health check endpoints
- Request logging
- Error tracking
- Performance metrics

### Scalability
- Stateless design
- Horizontal scaling ready
- Database connection pooling
- Async operations

