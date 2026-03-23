import { CenzeroApp, logger, cors, compression, responseTime, securityHeaders, requestId } from 'cnzr';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new CenzeroApp({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  staticDir: 'public',
  staticOptions: {
    maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
    etag: true,
    lastModified: true,
    index: false
  },
  viewEngine: 'ejs',
  viewsDir: 'views',
  session: {
    secret: process.env.SESSION_SECRET || 'cnzr-pixel-secret-key-change-in-production',
    name: 'cnzr.sid',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
    rolling: true,
    resave: false,
    saveUninitialized: false
  },
  security: {
    poweredBy: false,
    hideTechStack: true
  }
});

// ============================================
// PLUGINS - Full CNZR Plugin System
// ============================================

// 1. Logger Plugin - Enhanced logging
app.plugin(logger({ 
  level: process.env.LOG_LEVEL || 'info',
  colorize: process.env.LOG_COLORIZE !== 'false',
  format: 'combined',
  timestamp: true
}));

// 2. CORS Plugin - Cross-Origin Resource Sharing
app.plugin(cors({ 
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Response-Time', 'X-Request-Id'],
  maxAge: 86400 // 24 hours
}));

// 3. Compression Plugin - Response compression
app.plugin(compression({ 
  level: 6,
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// 4. Response Time Plugin - Performance tracking
app.plugin(responseTime());

// 5. Security Headers Plugin - Security best practices
app.plugin(securityHeaders({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'fonts.gstatic.com', 'cdnjs.cloudflare.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"]
    }
  },
  xssProtection: true,
  noSniff: true,
  frameguard: { action: 'deny' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// 6. Request ID Plugin - Unique request tracking
app.plugin(requestId());

// ============================================
// CUSTOM PLUGINS - Advanced Features
// ============================================

// Custom Analytics Plugin
const analyticsPlugin = {
  name: 'analytics',
  hooks: {
    onRequest: (ctx) => {
      ctx.state.analytics = {
        startTime: Date.now(),
        userAgent: ctx.req.headers['user-agent'],
        ip: ctx.req.ip || ctx.req.connection.remoteAddress,
        method: ctx.req.method,
        path: ctx.req.url
      };
    },
    onResponse: (ctx) => {
      const duration = Date.now() - ctx.state.analytics.startTime;
      console.log(`[Analytics] ${ctx.state.analytics.method} ${ctx.state.analytics.path} - ${ctx.res.statusCode} (${duration}ms)`);
    }
  }
};

app.plugin(analyticsPlugin);

// Custom Rate Limiter Plugin
const rateLimitMap = new Map();

const rateLimiterPlugin = {
  name: 'rate-limiter',
  hooks: {
    onRequest: (ctx) => {
      const ip = ctx.req.ip || ctx.req.connection.remoteAddress;
      const now = Date.now();
      const windowMs = 60000; // 1 minute
      const maxRequests = 100;
      
      if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return;
      }
      
      const data = rateLimitMap.get(ip);
      
      if (now > data.resetTime) {
        data.count = 1;
        data.resetTime = now + windowMs;
        return;
      }
      
      if (data.count >= maxRequests) {
        ctx.res.setHeader('X-RateLimit-Limit', maxRequests);
        ctx.res.setHeader('X-RateLimit-Remaining', 0);
        ctx.res.setHeader('X-RateLimit-Reset', data.resetTime);
        throw ctx.createError(429, 'Too Many Requests');
      }
      
      data.count++;
      ctx.res.setHeader('X-RateLimit-Limit', maxRequests);
      ctx.res.setHeader('X-RateLimit-Remaining', maxRequests - data.count);
      ctx.res.setHeader('X-RateLimit-Reset', data.resetTime);
    }
  }
};

app.plugin(rateLimiterPlugin);

// ============================================
// MIDDLEWARE - Context & Legacy Support
// ============================================

// Global state middleware (Modern Context API)
app.use((ctx, next) => {
  ctx.state.startTime = Date.now();
  ctx.state.theme = 'pixel-retro';
  ctx.state.version = '2.5.2';
  ctx.state.environment = process.env.NODE_ENV || 'development';
  return next();
});

// Request logging middleware (Legacy Express-style)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// CORS preflight handler
app.use((ctx, next) => {
  if (ctx.req.method === 'OPTIONS') {
    ctx.res.statusCode = 204;
    ctx.res.end();
    return;
  }
  return next();
});

// ============================================
// PAGE ROUTES - Using CNZR Template Engine
// ============================================

app.get('/', (ctx) => {
  return ctx.render('index', {
    title: 'CNZR Framework - Modern Node.js Framework',
    description: 'Fast, developer-friendly, and feature-rich',
    theme: ctx.state.theme,
    version: ctx.state.version,
    user: ctx.session.get('user'),
    stats: {
      version: '2.5.2',
      downloads: '10K+',
      stars: '500+',
      contributors: '15+'
    }
  });
});

app.get('/docs', (ctx) => {
  return ctx.render('docs', {
    title: 'Documentation - CNZR Framework',
    theme: ctx.state.theme,
    sections: [
      'installation',
      'quickstart',
      'routing',
      'context',
      'middleware',
      'plugins',
      'session',
      'error',
      'cli'
    ]
  });
});

app.get('/playground', (ctx) => {
  return ctx.render('playground', {
    title: 'API Playground - CNZR Framework',
    theme: ctx.state.theme,
    endpoints: [
      { method: 'GET', path: '/api/stats' },
      { method: 'GET', path: '/health' },
      { method: 'POST', path: '/api/feedback' }
    ]
  });
});

// API Routes with full context features
app.get('/api/stats', (ctx) => {
  const stats = {
    version: '2.5.2',
    downloads: '10K+',
    stars: '500+',
    contributors: '15+',
    responseTime: Date.now() - ctx.state.startTime
  };
  
  // Session example
  ctx.session.set('lastVisit', new Date().toISOString());
  
  // Cookie example
  ctx.cookies.set('theme', 'pixel-retro', { httpOnly: true });
  
  return ctx.json(stats);
});

app.get('/api/features', (ctx) => {
  return ctx.json({
    features: [
      { id: 1, name: 'Advanced Routing', icon: '🎯', category: 'core' },
      { id: 2, name: 'Plugin System', icon: '🔌', category: 'core' },
      { id: 3, name: 'TypeScript First', icon: '📘', category: 'dx' },
      { id: 4, name: 'Session & Cookies', icon: '🍪', category: 'core' },
      { id: 5, name: 'File-based Routing', icon: '📁', category: 'routing' },
      { id: 6, name: 'Hot Reload', icon: '🔥', category: 'dx' }
    ]
  });
});

app.post('/api/feedback', async (ctx) => {
  const { name, message } = ctx.body;
  
  if (!name || !message) {
    throw ctx.createError(400, 'Name and message are required');
  }
  
  // Store in session
  ctx.session.set('lastFeedback', { name, message, timestamp: Date.now() });
  
  return ctx.status(201).json({
    success: true,
    message: 'Feedback received!',
    data: { name, message }
  });
});

// Dynamic route with params
app.get('/api/docs/:section', (ctx) => {
  const section = ctx.params.section;
  const query = ctx.query;
  
  return ctx.json({
    section,
    query,
    available: ['getting-started', 'routing', 'middleware', 'plugins', 'api']
  });
});

// Error handler
app.onError((error, ctx) => {
  console.error('❌ Error:', error.message);
  
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  return ctx.status(status).json({
    error: true,
    status,
    message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((ctx) => {
  return ctx.status(404).json({
    error: true,
    status: 404,
    message: 'Route not found',
    path: ctx.req.url
  });
});

app.listen();
console.log('🎮 CNZR Pixel Website running on http://localhost:3000');

// ============================================
// ADVANCED ROUTING - All HTTP Methods
// ============================================

// Health check endpoint
app.get('/health', (ctx) => {
  return ctx.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: ctx.state.version,
    environment: ctx.state.environment,
    memory: process.memoryUsage()
  });
});

// API versioning example
app.get('/api/v1/info', (ctx) => {
  return ctx.json({
    version: 'v1',
    framework: 'CNZR',
    features: ['routing', 'plugins', 'middleware', 'sessions']
  });
});

// ============================================
// ADVANCED API ENDPOINTS
// ============================================

// GET with query parameters
app.get('/api/search', (ctx) => {
  const { q, page = 1, limit = 10 } = ctx.query;
  
  if (!q) {
    throw ctx.createError(400, 'Query parameter "q" is required');
  }
  
  return ctx.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: [],
    total: 0
  });
});

// POST with body validation
app.post('/api/validate', (ctx) => {
  const { email, password } = ctx.body;
  
  const errors = [];
  
  if (!email || !email.includes('@')) {
    errors.push('Invalid email address');
  }
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  if (errors.length > 0) {
    return ctx.status(400).json({ errors });
  }
  
  return ctx.json({ message: 'Validation passed', data: { email } });
});

// PUT endpoint
app.put('/api/settings', (ctx) => {
  const settings = ctx.body;
  
  // Store in session
  ctx.session.set('settings', settings);
  
  return ctx.json({
    message: 'Settings updated',
    settings
  });
});

// PATCH endpoint
app.patch('/api/profile', (ctx) => {
  const updates = ctx.body;
  const currentProfile = ctx.session.get('profile') || {};
  
  const updatedProfile = { ...currentProfile, ...updates };
  ctx.session.set('profile', updatedProfile);
  
  return ctx.json({
    message: 'Profile updated',
    profile: updatedProfile
  });
});

// DELETE endpoint
app.delete('/api/cache', (ctx) => {
  ctx.session.clear();
  
  return ctx.json({
    message: 'Cache cleared',
    timestamp: Date.now()
  });
});

// ============================================
// FILE UPLOAD EXAMPLE (Multipart)
// ============================================

app.post('/api/upload', (ctx) => {
  // Note: For actual file upload, you'd use multer or similar
  const contentType = ctx.req.headers['content-type'];
  
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw ctx.createError(400, 'Content-Type must be multipart/form-data');
  }
  
  return ctx.json({
    message: 'Upload endpoint ready',
    note: 'Integrate with multer for actual file handling'
  });
});

// ============================================
// TEMPLATE RENDERING - Full EJS Support
// ============================================

// Render with data
app.get('/template-demo', (ctx) => {
  return ctx.render('index', {
    title: 'Template Demo',
    user: {
      name: 'Developer',
      role: 'Admin'
    },
    items: ['Item 1', 'Item 2', 'Item 3']
  });
});

// ============================================
// REDIRECT EXAMPLES
// ============================================

app.get('/redirect-demo', (ctx) => {
  return ctx.redirect('/');
});

app.get('/redirect-external', (ctx) => {
  return ctx.redirect('https://github.com/CenZero/cnzr');
});

// ============================================
// COOKIE MANAGEMENT EXAMPLES
// ============================================

app.get('/api/cookies/set', (ctx) => {
  ctx.cookies.set('user_preference', 'dark-mode', {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  
  ctx.cookies.set('session_token', 'abc123', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
  
  return ctx.json({
    message: 'Cookies set',
    cookies: ['user_preference', 'session_token']
  });
});

app.get('/api/cookies/get', (ctx) => {
  const preference = ctx.cookies.get('user_preference');
  const token = ctx.cookies.get('session_token');
  
  return ctx.json({
    user_preference: preference,
    session_token: token
  });
});

app.get('/api/cookies/delete', (ctx) => {
  ctx.cookies.delete('user_preference');
  ctx.cookies.delete('session_token');
  
  return ctx.json({
    message: 'Cookies deleted'
  });
});

// ============================================
// SESSION MANAGEMENT EXAMPLES
// ============================================

app.post('/api/session/login', (ctx) => {
  const { username, password } = ctx.body;
  
  // Simulate authentication
  if (username && password) {
    ctx.session.set('user', {
      id: Date.now(),
      username,
      loginTime: new Date().toISOString()
    });
    
    ctx.session.set('isAuthenticated', true);
    
    return ctx.json({
      message: 'Login successful',
      user: { username }
    });
  }
  
  throw ctx.createError(401, 'Invalid credentials');
});

app.get('/api/session/profile', (ctx) => {
  const user = ctx.session.get('user');
  const isAuthenticated = ctx.session.get('isAuthenticated');
  
  if (!isAuthenticated) {
    throw ctx.createError(401, 'Not authenticated');
  }
  
  return ctx.json({
    user,
    sessionData: {
      isAuthenticated,
      lastAccess: new Date().toISOString()
    }
  });
});

app.post('/api/session/logout', (ctx) => {
  ctx.session.clear();
  
  return ctx.json({
    message: 'Logged out successfully'
  });
});

// ============================================
// STATE MANAGEMENT EXAMPLES
// ============================================

app.get('/api/state-demo', (ctx) => {
  // Access state set by middleware
  const duration = Date.now() - ctx.state.startTime;
  
  return ctx.json({
    theme: ctx.state.theme,
    version: ctx.state.version,
    environment: ctx.state.environment,
    requestDuration: `${duration}ms`,
    customState: ctx.state.analytics
  });
});

// ============================================
// ERROR HANDLING EXAMPLES
// ============================================

app.get('/api/error/400', (ctx) => {
  throw ctx.createError(400, 'Bad Request Example');
});

app.get('/api/error/401', (ctx) => {
  throw ctx.createError(401, 'Unauthorized Example');
});

app.get('/api/error/403', (ctx) => {
  throw ctx.createError(403, 'Forbidden Example');
});

app.get('/api/error/404', (ctx) => {
  throw ctx.createError(404, 'Not Found Example');
});

app.get('/api/error/500', (ctx) => {
  throw new Error('Internal Server Error Example');
});

// ============================================
// RESPONSE HELPERS EXAMPLES
// ============================================

// JSON response
app.get('/api/response/json', (ctx) => {
  return ctx.json({
    type: 'json',
    data: { message: 'JSON response' }
  });
});

// HTML response
app.get('/api/response/html', (ctx) => {
  return ctx.html('<h1>HTML Response</h1><p>Direct HTML rendering</p>');
});

// Text response
app.get('/api/response/text', (ctx) => {
  ctx.res.setHeader('Content-Type', 'text/plain');
  ctx.res.end('Plain text response');
});

// Custom status codes
app.get('/api/response/created', (ctx) => {
  return ctx.status(201).json({ message: 'Resource created' });
});

app.get('/api/response/accepted', (ctx) => {
  return ctx.status(202).json({ message: 'Request accepted' });
});

app.get('/api/response/no-content', (ctx) => {
  return ctx.status(204).json({});
});

// ============================================
// MIDDLEWARE CHAIN EXAMPLE
// ============================================

const authMiddleware = (ctx, next) => {
  const isAuthenticated = ctx.session.get('isAuthenticated');
  
  if (!isAuthenticated) {
    throw ctx.createError(401, 'Authentication required');
  }
  
  return next();
};

const adminMiddleware = (ctx, next) => {
  const user = ctx.session.get('user');
  
  if (!user || user.role !== 'admin') {
    throw ctx.createError(403, 'Admin access required');
  }
  
  return next();
};

// Protected route with middleware chain
app.get('/api/admin/dashboard', authMiddleware, adminMiddleware, (ctx) => {
  return ctx.json({
    message: 'Admin dashboard',
    user: ctx.session.get('user')
  });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================

app.onError((error, ctx) => {
  console.error('❌ Error:', {
    message: error.message,
    stack: error.stack,
    url: ctx.req.url,
    method: ctx.req.method,
    timestamp: new Date().toISOString()
  });
  
  const status = error.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Internal Server Error'
    : error.message;
  
  return ctx.status(status).json({
    error: true,
    status,
    message,
    timestamp: new Date().toISOString(),
    path: ctx.req.url,
    requestId: ctx.res.getHeader('X-Request-Id')
  });
});

// ============================================
// 404 HANDLER - Must be last
// ============================================

app.use((ctx) => {
  return ctx.status(404).json({
    error: true,
    status: 404,
    message: 'Route not found',
    path: ctx.req.url,
    availableRoutes: [
      'GET /',
      'GET /docs',
      'GET /playground',
      'GET /health',
      'GET /api/stats',
      'GET /api/features',
      'POST /api/feedback'
    ]
  });
});

// ============================================
// START SERVER
// ============================================

app.listen();

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR PIXEL WEBSITE - FULL FRAMEWORK IMPLEMENTATION     ║
║                                                              ║
║   Server: http://${app.config.host}:${app.config.port}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                            ║
║   Version: 2.5.2                                            ║
║                                                              ║
║   Features Enabled:                                         ║
║   ✅ Modern Context API                                     ║
║   ✅ Advanced Routing (GET, POST, PUT, PATCH, DELETE)      ║
║   ✅ 6 Built-in Plugins                                     ║
║   ✅ 2 Custom Plugins                                       ║
║   ✅ Session Management                                     ║
║   ✅ Cookie Management                                      ║
║   ✅ State Management                                       ║
║   ✅ Error Handling                                         ║
║   ✅ Middleware Chain                                       ║
║   ✅ Rate Limiting                                          ║
║   ✅ Security Headers                                       ║
║   ✅ Response Compression                                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
