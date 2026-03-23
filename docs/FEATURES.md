# 🎮 CNZR Framework Features

Comprehensive list of all CNZR features implemented in this website.

## 🎯 Core Framework Features

### 1. Modern Context API ✅

```javascript
app.get('/user/:id', (ctx) => {
  // Access everything through ctx
  const userId = ctx.params.id;
  const query = ctx.query;
  const body = ctx.body;
  
  // Response helpers
  return ctx.json({ userId });
});
```

**Benefits:**
- Cleaner API than Express
- All request/response in one object
- Type-safe with TypeScript
- Easier to test

---

### 2. Advanced Routing ✅

#### Basic Routes
```javascript
app.get('/users', handler);
app.post('/users', handler);
app.put('/users/:id', handler);
app.delete('/users/:id', handler);
```

#### Dynamic Parameters
```javascript
app.get('/users/:id', (ctx) => {
  const id = ctx.params.id;
});
```

#### File-based Routing
```
routes/
├── index.js          // GET /
├── users/
│   ├── index.js      // GET /users
│   ├── [id].js       // GET /users/:id
│   └── [...slug].js  // GET /users/*
```

---

### 3. Plugin System ✅

#### Built-in Plugins

**Logger Plugin**
```javascript
import { logger } from 'cnzr';

app.plugin(logger({
  level: 'info',
  colorize: true,
  format: 'combined'
}));
```

**CORS Plugin**
```javascript
import { cors } from 'cnzr';

app.plugin(cors({
  origin: ['https://example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

**Compression Plugin**
```javascript
import { compression } from 'cnzr';

app.plugin(compression({
  level: 6,
  threshold: 1024
}));
```

**Response Time Plugin**
```javascript
import { responseTime } from 'cnzr';

app.plugin(responseTime());
// Adds X-Response-Time header
```

**Security Headers Plugin**
```javascript
import { securityHeaders } from 'cnzr';

app.plugin(securityHeaders({
  contentSecurityPolicy: true,
  xssProtection: true
}));
```

**Request ID Plugin**
```javascript
import { requestId } from 'cnzr';

app.plugin(requestId());
// Adds X-Request-Id header
```

#### Custom Plugins

```javascript
const customPlugin = {
  name: 'custom',
  hooks: {
    onRequest: (ctx) => {
      console.log('Request:', ctx.req.url);
    },
    onResponse: (ctx) => {
      console.log('Response:', ctx.res.statusCode);
    },
    onError: (error, ctx) => {
      console.error('Error:', error);
    }
  }
};

app.plugin(customPlugin);
```

---

### 4. Session Management ✅

```javascript
// Configuration
const app = new CenzeroApp({
  session: {
    secret: 'your-secret-key',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
});

// Usage
app.get('/profile', (ctx) => {
  // Get session data
  const user = ctx.session.get('user');
  
  // Set session data
  ctx.session.set('lastVisit', Date.now());
  
  // Clear session
  ctx.session.clear();
  
  return ctx.json({ user });
});
```

---

### 5. Cookie Management ✅

```javascript
app.get('/theme', (ctx) => {
  // Set cookie
  ctx.cookies.set('theme', 'dark', {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: true,
    sameSite: 'lax'
  });
  
  // Get cookie
  const theme = ctx.cookies.get('theme');
  
  // Delete cookie
  ctx.cookies.delete('theme');
  
  return ctx.json({ theme });
});
```

---

### 6. Middleware System ✅

#### Modern Context Middleware
```javascript
app.use((ctx, next) => {
  ctx.state.startTime = Date.now();
  return next();
});
```

#### Legacy Express-style
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

#### Route-specific
```javascript
const authMiddleware = (ctx, next) => {
  if (!ctx.session.get('user')) {
    throw ctx.createError(401, 'Unauthorized');
  }
  return next();
};

app.get('/admin', authMiddleware, handler);
```

---

### 7. Error Handling ✅

#### Global Error Handler
```javascript
app.onError((error, ctx) => {
  console.error('Error:', error);
  
  const status = error.status || 500;
  const message = error.message || 'Internal Error';
  
  return ctx.status(status).json({
    error: true,
    status,
    message,
    timestamp: new Date().toISOString()
  });
});
```

#### Throwing Errors
```javascript
app.get('/protected', (ctx) => {
  if (!authorized) {
    throw ctx.createError(401, 'Unauthorized');
  }
  
  return ctx.json({ data: 'protected' });
});
```

---

### 8. State Management ✅

```javascript
app.use((ctx, next) => {
  // Set state
  ctx.state.user = { id: 1 };
  ctx.state.startTime = Date.now();
  return next();
});

app.get('/data', (ctx) => {
  // Access state
  const user = ctx.state.user;
  const duration = Date.now() - ctx.state.startTime;
  
  return ctx.json({ user, duration });
});
```

---

### 9. Response Helpers ✅

```javascript
// JSON response
ctx.json({ data: 'value' });

// HTML response
ctx.html('<h1>Hello</h1>');

// Redirect
ctx.redirect('/login');

// Status code
ctx.status(201).json({ created: true });

// Render template
ctx.render('index', { title: 'Home' });

// Create error
throw ctx.createError(404, 'Not Found');
```

---

### 10. Request Properties ✅

```javascript
app.post('/data', (ctx) => {
  // Route parameters
  const id = ctx.params.id;
  
  // Query string
  const page = ctx.query.page;
  
  // Request body
  const data = ctx.body;
  
  // Headers
  const auth = ctx.req.headers.authorization;
  
  // Method
  const method = ctx.req.method;
  
  // URL
  const url = ctx.req.url;
  
  return ctx.json({ id, page, data });
});
```

---

## 🎨 Website-Specific Features

### 1. Pixel Art Design ✅
- Retro gaming aesthetic
- Custom color palette
- Pixel-perfect shadows
- Scanline CRT effect

### 2. Responsive Layout ✅
- Mobile-first design
- Tablet optimization
- Desktop layouts
- Flexible grids

### 3. Interactive Playground ✅
- Real-time API testing
- Request/response display
- Quick examples
- Console logging

### 4. Complete Documentation ✅
- Installation guide
- API reference
- Code examples
- Best practices

### 5. Syntax Highlighting ✅
- Color-coded code
- Multiple languages
- Copy to clipboard
- Readable formatting

---

## 🔧 Developer Experience

### 1. TypeScript Support ✅
- Full type safety
- IntelliSense
- Better refactoring
- Compile-time checks

### 2. Hot Reload ✅
- Auto CSS rebuild
- Fast development
- No manual refresh
- Watch mode

### 3. CLI Tools ✅
- Project scaffolding
- Route generation
- Development server
- Build commands

### 4. Template Engine ✅
- EJS support
- Data passing
- Partials
- Layouts

---

## 📊 Performance Features

### 1. Compression ✅
- Gzip/Deflate
- Configurable level
- Automatic handling
- Size threshold

### 2. Caching ✅
- Static file caching
- ETag support
- Cache headers
- Max-age control

### 3. Response Time ✅
- Automatic tracking
- Header injection
- Performance monitoring
- Optimization insights

---

## 🔒 Security Features

### 1. Security Headers ✅
- XSS Protection
- Content Security Policy
- Frame Options
- HSTS

### 2. CORS ✅
- Origin control
- Credentials support
- Method filtering
- Header configuration

### 3. Session Security ✅
- Secure cookies
- HttpOnly flag
- SameSite attribute
- Secret key

---

## 🎯 All Features Checklist

Core Framework:
- [x] Modern Context API
- [x] Advanced Routing
- [x] Dynamic Parameters
- [x] File-based Routing
- [x] Plugin System
- [x] Session Management
- [x] Cookie Management
- [x] Middleware (Modern & Legacy)
- [x] Error Handling
- [x] State Management
- [x] Response Helpers
- [x] Request Properties

Plugins:
- [x] Logger Plugin
- [x] CORS Plugin
- [x] Compression Plugin
- [x] Response Time Plugin
- [x] Security Headers Plugin
- [x] Request ID Plugin

Website:
- [x] Pixel Art Design
- [x] Responsive Layout
- [x] Interactive Playground
- [x] Complete Documentation
- [x] Syntax Highlighting
- [x] Code Examples
- [x] API Testing
- [x] Quick Start Guide

Developer Experience:
- [x] TypeScript Support
- [x] Hot Reload
- [x] CLI Tools
- [x] Template Engine
- [x] File Structure
- [x] Best Practices

Performance:
- [x] Compression
- [x] Caching
- [x] Response Time Tracking
- [x] Optimization

Security:
- [x] Security Headers
- [x] CORS Configuration
- [x] Session Security
- [x] Cookie Security

---

**Total: 40+ Features Implemented! 🎉**
