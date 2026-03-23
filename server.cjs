const { CenzeroApp } = require('cnzr');
const path = require('path');
const zlib = require('zlib');

const app = new CenzeroApp({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  staticDir: 'public',
  staticOptions: {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
    etag: true,
    lastModified: true,
    index: false,
    immutable: process.env.NODE_ENV === 'production'
  },
  viewEngine: 'ejs',
  viewsDir: 'views',
  session: {
    secret: process.env.SESSION_SECRET || 'cnzr-pixel-secret-key-change-in-production',
    name: 'cnzr.sid',
    maxAge: 24 * 60 * 60 * 1000,
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
// MIDDLEWARE
// ============================================

// Compression middleware for responses
app.use((ctx, next) => {
  const acceptEncoding = ctx.req.headers['accept-encoding'] || '';
  
  // Store original end function
  const originalEnd = ctx.res.end;
  const chunks = [];
  
  // Override end to capture response
  ctx.res.end = function(chunk, encoding) {
    if (chunk) {
      chunks.push(Buffer.from(chunk, encoding));
    }
    
    const buffer = Buffer.concat(chunks);
    const contentType = ctx.res.getHeader('content-type') || '';
    
    // Only compress text-based responses > 1KB
    if (buffer.length > 1024 && 
        (contentType.includes('text') || 
         contentType.includes('json') || 
         contentType.includes('javascript') ||
         contentType.includes('css'))) {
      
      if (acceptEncoding.includes('gzip')) {
        ctx.res.setHeader('Content-Encoding', 'gzip');
        zlib.gzip(buffer, (err, compressed) => {
          if (!err) {
            ctx.res.setHeader('Content-Length', compressed.length);
            originalEnd.call(ctx.res, compressed);
          } else {
            originalEnd.call(ctx.res, buffer);
          }
        });
        return;
      }
    }
    
    originalEnd.call(ctx.res, buffer);
  };
  
  return next();
});

// Cache control middleware
app.use((ctx, next) => {
  const url = ctx.req.url;
  
  // Set cache headers for static assets
  if (url.match(/\.(css|js|jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$/)) {
    ctx.res.setHeader('Cache-Control', process.env.NODE_ENV === 'production' 
      ? 'public, max-age=31536000, immutable' 
      : 'no-cache');
  } else if (url.startsWith('/api/')) {
    // No cache for API endpoints
    ctx.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  } else {
    // Short cache for HTML pages
    ctx.res.setHeader('Cache-Control', 'public, max-age=300');
  }
  
  return next();
});

// Global state middleware
app.use((ctx, next) => {
  ctx.state.startTime = Date.now();
  ctx.state.theme = 'pixel-retro';
  ctx.state.version = '2.5.2';
  ctx.state.environment = process.env.NODE_ENV || 'development';
  return next();
});

// Request logging (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
  });
}

// CORS preflight
app.use((ctx, next) => {
  if (ctx.req.method === 'OPTIONS') {
    ctx.res.statusCode = 204;
    ctx.res.end();
    return;
  }
  return next();
});

// ============================================
// PAGE ROUTES
// ============================================

app.get('/', async (ctx) => {
  const html = await app.render('index', {
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
  return ctx.html(html);
});

app.get('/docs', async (ctx) => {
  const html = await app.render('docs', {
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
  return ctx.html(html);
});

app.get('/playground', async (ctx) => {
  const html = await app.render('playground', {
    title: 'API Playground - CNZR Framework',
    theme: ctx.state.theme,
    endpoints: [
      { method: 'GET', path: '/api/stats' },
      { method: 'GET', path: '/health' },
      { method: 'POST', path: '/api/feedback' }
    ]
  });
  return ctx.html(html);
});

// Community page
app.get('/community', async (ctx) => {
  const html = await app.render('community', {
    title: 'Community - CNZR Framework',
    theme: ctx.state.theme
  });
  return ctx.html(html);
});

// Privacy Policy page
app.get('/privacy', async (ctx) => {
  const html = await app.render('privacy', {
    title: 'Privacy Policy - CNZR Framework'
  });
  return ctx.html(html);
});

// Terms of Service page
app.get('/terms', async (ctx) => {
  const html = await app.render('terms', {
    title: 'Terms of Service - CNZR Framework'
  });
  return ctx.html(html);
});

// ============================================
// API ROUTES
// ============================================

app.get('/api/stats', (ctx) => {
  const stats = {
    version: '2.5.2',
    downloads: '10K+',
    stars: '500+',
    contributors: '15+',
    responseTime: Date.now() - ctx.state.startTime
  };
  
  ctx.session.set('lastVisit', new Date().toISOString());
  ctx.cookies.set('theme', 'pixel-retro', { httpOnly: true });
  
  return ctx.json(stats);
});

app.get('/api/features', (ctx) => {
  return ctx.json({
    features: [
      { id: 1, name: 'Advanced Routing', icon: 'route', category: 'core' },
      { id: 2, name: 'Plugin System', icon: 'puzzle', category: 'core' },
      { id: 3, name: 'TypeScript First', icon: 'code', category: 'dx' },
      { id: 4, name: 'Session & Cookies', icon: 'document', category: 'core' },
      { id: 5, name: 'File-based Routing', icon: 'folder', category: 'routing' },
      { id: 6, name: 'Hot Reload', icon: 'lightning', category: 'dx' }
    ]
  });
});

app.post('/api/feedback', async (ctx) => {
  const { name, message } = ctx.body;
  
  if (!name || !message) {
    throw ctx.createError(400, 'Name and message are required');
  }
  
  ctx.session.set('lastFeedback', { name, message, timestamp: Date.now() });
  
  ctx.res.statusCode = 201;
  return ctx.json({
    success: true,
    message: 'Feedback received!',
    data: { name, message }
  });
});

app.get('/api/docs/:section', (ctx) => {
  const section = ctx.params.section;
  const query = ctx.query;
  
  return ctx.json({
    section,
    query,
    available: ['getting-started', 'routing', 'middleware', 'plugins', 'api']
  });
});

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

// ============================================
// ERROR HANDLERS
// ============================================

app.onError((error, ctx) => {
  console.error('[ERROR]', error.message);
  
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  
  // Set status code directly on response
  if (ctx && ctx.res) {
    ctx.res.statusCode = status;
    ctx.json({
      error: true,
      status,
      message,
      timestamp: new Date().toISOString()
    });
  }
});

app.use((ctx) => {
  if (ctx && ctx.res) {
    ctx.res.statusCode = 404;
    ctx.json({
      error: true,
      status: 404,
      message: 'Route not found',
      path: ctx.req.url
    });
  }
});

// ============================================
// START SERVER
// ============================================

app.listen();

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   [CNZR] PIXEL WEBSITE - FULL FRAMEWORK                     ║
║                                                              ║
║   Server: http://localhost:3000                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                            ║
║   Version: 2.5.2                                            ║
║                                                              ║
║   Features:                                                 ║
║   [✓] Modern Context API                                    ║
║   [✓] Session & Cookie Management                           ║
║   [✓] Advanced Routing                                      ║
║   [✓] Error Handling                                        ║
║   [✓] Middleware Chain                                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
