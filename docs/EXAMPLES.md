# 💡 CNZR Framework Examples

Practical examples for common use cases with CNZR Framework.

## 📚 Table of Contents

1. [Basic Server Setup](#basic-server-setup)
2. [REST API](#rest-api)
3. [Authentication](#authentication)
4. [File Upload](#file-upload)
5. [Database Integration](#database-integration)
6. [WebSocket](#websocket)
7. [Middleware Patterns](#middleware-patterns)
8. [Error Handling](#error-handling)
9. [Testing](#testing)

---

## 🚀 Basic Server Setup

### Minimal Server

```javascript
import { CenzeroApp } from 'cnzr';

const app = new CenzeroApp();

app.get('/', (ctx) => {
  return ctx.json({ message: 'Hello CNZR!' });
});

app.listen(3000);
```

### Full Configuration

```javascript
import { CenzeroApp, logger, cors, compression } from 'cnzr';

const app = new CenzeroApp({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  staticDir: 'public',
  viewEngine: 'ejs',
  viewsDir: 'views',
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production'
  }
});

// Plugins
app.plugin(logger({ level: 'info', colorize: true }));
app.plugin(cors({ origin: '*', credentials: true }));
app.plugin(compression({ level: 6 }));

// Global middleware
app.use((ctx, next) => {
  ctx.state.requestTime = Date.now();
  return next();
});

// Error handler
app.onError((error, ctx) => {
  console.error('Error:', error);
  return ctx.status(error.status || 500).json({
    error: error.message
  });
});

app.listen();
```

---

## 🔌 REST API

### Complete CRUD Example

```javascript
// In-memory database
const users = new Map();
let nextId = 1;

// List all users
app.get('/api/users', (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;
  
  const allUsers = Array.from(users.values());
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return ctx.json({
    data: allUsers.slice(start, end),
    pagination: {
      page,
      limit,
      total: allUsers.length
    }
  });
});

// Get single user
app.get('/api/users/:id', (ctx) => {
  const user = users.get(ctx.params.id);
  
  if (!user) {
    throw ctx.createError(404, 'User not found');
  }
  
  return ctx.json({ data: user });
});

// Create user
app.post('/api/users', (ctx) => {
  const { name, email } = ctx.body;
  
  if (!name || !email) {
    throw ctx.createError(400, 'Name and email required');
  }
  
  const user = {
    id: String(nextId++),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.set(user.id, user);
  
  return ctx.status(201).json({ data: user });
});

// Update user
app.put('/api/users/:id', (ctx) => {
  const user = users.get(ctx.params.id);
  
  if (!user) {
    throw ctx.createError(404, 'User not found');
  }
  
  const { name, email } = ctx.body;
  
  if (name) user.name = name;
  if (email) user.email = email;
  user.updatedAt = new Date().toISOString();
  
  users.set(user.id, user);
  
  return ctx.json({ data: user });
});

// Delete user
app.delete('/api/users/:id', (ctx) => {
  if (!users.has(ctx.params.id)) {
    throw ctx.createError(404, 'User not found');
  }
  
  users.delete(ctx.params.id);
  
  return ctx.status(204).json({});
});
```

---

## 🔐 Authentication

### Session-based Auth

```javascript
// Login
app.post('/auth/login', async (ctx) => {
  const { email, password } = ctx.body;
  
  // Validate credentials (example)
  const user = await findUserByEmail(email);
  
  if (!user || !await verifyPassword(password, user.password)) {
    throw ctx.createError(401, 'Invalid credentials');
  }
  
  // Set session
  ctx.session.set('userId', user.id);
  ctx.session.set('email', user.email);
  
  return ctx.json({
    message: 'Login successful',
    user: { id: user.id, email: user.email }
  });
});

// Logout
app.post('/auth/logout', (ctx) => {
  ctx.session.clear();
  return ctx.json({ message: 'Logged out' });
});

// Auth middleware
const requireAuth = (ctx, next) => {
  const userId = ctx.session.get('userId');
  
  if (!userId) {
    throw ctx.createError(401, 'Authentication required');
  }
  
  ctx.state.userId = userId;
  return next();
};

// Protected route
app.get('/api/profile', requireAuth, async (ctx) => {
  const user = await findUserById(ctx.state.userId);
  return ctx.json({ data: user });
});
```

### JWT Auth

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Login with JWT
app.post('/auth/login', async (ctx) => {
  const { email, password } = ctx.body;
  
  const user = await findUserByEmail(email);
  
  if (!user || !await verifyPassword(password, user.password)) {
    throw ctx.createError(401, 'Invalid credentials');
  }
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return ctx.json({ token, user });
});

// JWT middleware
const verifyToken = (ctx, next) => {
  const authHeader = ctx.req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ctx.createError(401, 'No token provided');
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    ctx.state.user = decoded;
    return next();
  } catch (error) {
    throw ctx.createError(401, 'Invalid token');
  }
};

// Protected route
app.get('/api/profile', verifyToken, (ctx) => {
  return ctx.json({ user: ctx.state.user });
});
```

---

## 📁 File Upload

### Using Multer

```javascript
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

// Single file upload
app.post('/upload', upload.single('file'), (ctx) => {
  if (!ctx.req.file) {
    throw ctx.createError(400, 'No file uploaded');
  }
  
  return ctx.json({
    message: 'File uploaded',
    file: {
      filename: ctx.req.file.filename,
      size: ctx.req.file.size,
      path: `/uploads/${ctx.req.file.filename}`
    }
  });
});

// Multiple files
app.post('/upload/multiple', upload.array('files', 5), (ctx) => {
  const files = ctx.req.files.map(file => ({
    filename: file.filename,
    size: file.size,
    path: `/uploads/${file.filename}`
  }));
  
  return ctx.json({
    message: 'Files uploaded',
    files
  });
});
```

---

## 🗄️ Database Integration

### MongoDB with Mongoose

```javascript
import mongoose from 'mongoose';

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Define schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// CRUD operations
app.get('/api/users', async (ctx) => {
  const users = await User.find().select('-password');
  return ctx.json({ data: users });
});

app.post('/api/users', async (ctx) => {
  const user = new User(ctx.body);
  await user.save();
  return ctx.status(201).json({ data: user });
});

app.get('/api/users/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id).select('-password');
  
  if (!user) {
    throw ctx.createError(404, 'User not found');
  }
  
  return ctx.json({ data: user });
});
```

### PostgreSQL with Prisma

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List users
app.get('/api/users', async (ctx) => {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;
  
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: { id: true, name: true, email: true }
    }),
    prisma.user.count()
  ]);
  
  return ctx.json({
    data: users,
    pagination: { page, limit, total }
  });
});

// Create user
app.post('/api/users', async (ctx) => {
  const user = await prisma.user.create({
    data: ctx.body
  });
  
  return ctx.status(201).json({ data: user });
});

// Update user
app.put('/api/users/:id', async (ctx) => {
  const user = await prisma.user.update({
    where: { id: ctx.params.id },
    data: ctx.body
  });
  
  return ctx.json({ data: user });
});
```

---

## 🔌 WebSocket

### Using Socket.io

```javascript
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app.server);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('message', (data) => {
    console.log('Message:', data);
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// REST endpoint to broadcast
app.post('/api/broadcast', (ctx) => {
  const { message } = ctx.body;
  io.emit('broadcast', { message, timestamp: Date.now() });
  return ctx.json({ success: true });
});

httpServer.listen(3000);
```

---

## 🔧 Middleware Patterns

### Request Logging

```javascript
const requestLogger = (ctx, next) => {
  const start = Date.now();
  
  return next().then(() => {
    const duration = Date.now() - start;
    console.log(
      `${ctx.req.method} ${ctx.req.url} - ${ctx.res.statusCode} (${duration}ms)`
    );
  });
};

app.use(requestLogger);
```

### Rate Limiting

```javascript
const rateLimit = new Map();

const rateLimiter = (options = {}) => {
  const { max = 100, window = 60000 } = options;
  
  return (ctx, next) => {
    const ip = ctx.req.ip || ctx.req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, { count: 1, resetTime: now + window });
      return next();
    }
    
    const data = rateLimit.get(ip);
    
    if (now > data.resetTime) {
      data.count = 1;
      data.resetTime = now + window;
      return next();
    }
    
    if (data.count >= max) {
      throw ctx.createError(429, 'Too many requests');
    }
    
    data.count++;
    return next();
  };
};

app.use(rateLimiter({ max: 100, window: 60000 }));
```

### Request Validation

```javascript
const validateBody = (schema) => {
  return (ctx, next) => {
    const { error } = schema.validate(ctx.body);
    
    if (error) {
      throw ctx.createError(400, error.details[0].message);
    }
    
    return next();
  };
};

// Usage with Joi
import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18)
});

app.post('/api/users', validateBody(userSchema), (ctx) => {
  return ctx.json({ data: ctx.body });
});
```

---

## ❌ Error Handling

### Custom Error Classes

```javascript
class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(400, message);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

// Usage
app.get('/api/users/:id', async (ctx) => {
  const user = await findUser(ctx.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return ctx.json({ data: user });
});

// Error handler
app.onError((error, ctx) => {
  if (error instanceof AppError) {
    return ctx.status(error.status).json({
      error: error.message
    });
  }
  
  console.error('Unexpected error:', error);
  return ctx.status(500).json({
    error: 'Internal server error'
  });
});
```

---

## 🧪 Testing

### Using Jest

```javascript
import { CenzeroApp } from 'cnzr';
import request from 'supertest';

describe('API Tests', () => {
  let app;
  
  beforeAll(() => {
    app = new CenzeroApp();
    
    app.get('/api/test', (ctx) => {
      return ctx.json({ message: 'test' });
    });
  });
  
  test('GET /api/test', async () => {
    const response = await request(app.server)
      .get('/api/test')
      .expect(200);
    
    expect(response.body).toEqual({ message: 'test' });
  });
  
  test('POST /api/users', async () => {
    const userData = { name: 'John', email: 'john@example.com' };
    
    const response = await request(app.server)
      .post('/api/users')
      .send(userData)
      .expect(201);
    
    expect(response.body.data).toMatchObject(userData);
  });
});
```

---

## 🎯 More Examples

Check out:
- `/playground` - Interactive API testing
- `/docs` - Complete documentation
- GitHub repository for more examples

---

**Happy coding with CNZR! 🚀**
