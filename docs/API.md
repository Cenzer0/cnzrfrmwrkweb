# 📚 CNZR Website API Documentation

Complete API reference for the CNZR Framework website.

## Base URL

```
http://localhost:3000
```

## Endpoints

### 🏠 Pages

#### GET /
Homepage with pixel art design

**Response**: HTML page

---

#### GET /docs
Complete documentation page

**Response**: HTML page

---

#### GET /playground
Interactive API testing playground

**Response**: HTML page

---

### 📊 API Endpoints

#### GET /api/stats

Get framework statistics

**Response**:
```json
{
  "version": "2.5.2",
  "downloads": "10K+",
  "stars": "500+",
  "contributors": "15+",
  "responseTime": 5
}
```

**Headers**:
- `Set-Cookie`: Session cookie
- `Set-Cookie`: Theme cookie

---

#### GET /api/features

Get list of framework features

**Response**:
```json
{
  "features": [
    {
      "id": 1,
      "name": "Advanced Routing",
      "icon": "🎯",
      "category": "core"
    },
    {
      "id": 2,
      "name": "Plugin System",
      "icon": "🔌",
      "category": "core"
    }
  ]
}
```

---

#### POST /api/feedback

Submit user feedback

**Request Body**:
```json
{
  "name": "John Doe",
  "message": "Great framework!"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Feedback received!",
  "data": {
    "name": "John Doe",
    "message": "Great framework!"
  }
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": true,
  "status": 400,
  "message": "Name and message are required"
}
```

---

#### GET /api/docs/:section

Get documentation for specific section

**Parameters**:
- `section` (string): Section name (getting-started, routing, middleware, plugins, api)

**Query Parameters**:
- `format` (string, optional): Response format

**Example**:
```
GET /api/docs/routing?format=json
```

**Response**:
```json
{
  "section": "routing",
  "query": {
    "format": "json"
  },
  "available": [
    "getting-started",
    "routing",
    "middleware",
    "plugins",
    "api"
  ]
}
```

---

### 🧪 File-based Routes (Examples)

#### GET /api/test

Test endpoint for all HTTP methods

**Response**:
```json
{
  "status": "success",
  "message": "API test endpoint",
  "query": {},
  "timestamp": 1234567890
}
```

---

#### GET /api/users/:id

Get user by ID

**Parameters**:
- `id` (string): User ID

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "123",
    "name": "User 123",
    "email": "user123@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### PUT /api/users/:id

Update user by ID

**Parameters**:
- `id` (string): User ID

**Request Body**:
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User 123 updated",
  "updates": {
    "name": "Updated Name",
    "email": "newemail@example.com"
  }
}
```

---

#### DELETE /api/users/:id

Delete user by ID

**Parameters**:
- `id` (string): User ID

**Response**:
```json
{
  "success": true,
  "message": "User 123 deleted"
}
```

---

## Error Responses

All endpoints may return error responses:

### 404 Not Found
```json
{
  "error": true,
  "status": 404,
  "message": "Route not found",
  "path": "/api/unknown"
}
```

### 500 Internal Server Error
```json
{
  "error": true,
  "status": 500,
  "message": "Internal Server Error",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Headers

### Request Headers
- `Content-Type: application/json` - For POST/PUT requests
- `Cookie` - Session cookie (automatically handled)

### Response Headers
- `Content-Type: application/json` - For API responses
- `X-Response-Time` - Response time in milliseconds
- `X-Request-Id` - Unique request identifier
- `Set-Cookie` - Session and custom cookies

---

## Session & Cookies

### Session
The API uses session management for tracking user state:

```javascript
// Session is automatically created
// Access via ctx.session in routes

ctx.session.set('key', 'value');
const value = ctx.session.get('key');
ctx.session.clear();
```

### Cookies
Custom cookies can be set:

```javascript
ctx.cookies.set('theme', 'pixel-retro', {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

---

## Rate Limiting

Currently no rate limiting is implemented. This is suitable for development and demo purposes.

---

## CORS

CORS is enabled for all origins in development:

```javascript
{
  origin: '*',
  credentials: true
}
```

For production, configure specific origins in server.js.

---

## Examples

### Using fetch API

```javascript
// GET request
const response = await fetch('/api/stats');
const data = await response.json();

// POST request
const response = await fetch('/api/feedback', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John',
    message: 'Hello!'
  })
});
```

### Using curl

```bash
# GET request
curl http://localhost:3000/api/stats

# POST request
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John","message":"Hello!"}'

# Dynamic route
curl http://localhost:3000/api/users/123
```

---

## Testing

Use the built-in playground at `/playground` to test all endpoints interactively!
