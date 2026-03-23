import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle static files
  if (req.url.startsWith('/output.css') || req.url.startsWith('/app.js') || req.url.startsWith('/favicon.svg')) {
    const filePath = path.join(__dirname, 'public', req.url);
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
    return;
  }

  // Handle routes
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'views', 'index.ejs'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        // Simple template rendering
        const rendered = content
          .replace(/<%=\s*title\s*%>/g, 'CNZR Framework')
          .replace(/<%=\s*theme\s*%>/g, 'pixel-retro');
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(rendered);
      }
    });
  } else if (req.url === '/docs') {
    fs.readFile(path.join(__dirname, 'views', 'docs.ejs'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        const rendered = content
          .replace(/<%=\s*title\s*%>/g, 'Documentation - CNZR');
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(rendered);
      }
    });
  } else if (req.url === '/playground') {
    fs.readFile(path.join(__dirname, 'views', 'playground.ejs'), 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        const rendered = content
          .replace(/<%=\s*title\s*%>/g, 'Playground - CNZR');
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(rendered);
      }
    });
  } else if (req.url === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      version: '2.5.2',
      downloads: '10K+',
      stars: '500+',
      contributors: '15+',
      responseTime: 5
    }));
  } else if (req.url === '/api/features') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      features: [
        { id: 1, name: 'Advanced Routing', icon: '🎯', category: 'core' },
        { id: 2, name: 'Plugin System', icon: '🔌', category: 'core' },
        { id: 3, name: 'TypeScript First', icon: '📘', category: 'dx' },
        { id: 4, name: 'Session & Cookies', icon: '🍪', category: 'core' },
        { id: 5, name: 'File-based Routing', icon: '📁', category: 'routing' },
        { id: 6, name: 'Hot Reload', icon: '🔥', category: 'dx' }
      ]
    }));
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now()
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: true,
      status: 404,
      message: 'Route not found',
      path: req.url
    }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR PIXEL WEBSITE - DEMO SERVER                       ║
║                                                              ║
║   Server: http://${HOST}:${PORT}                              ║
║   Environment: development                                  ║
║                                                              ║
║   Pages:                                                    ║
║   • Homepage: http://${HOST}:${PORT}/                        ║
║   • Docs: http://${HOST}:${PORT}/docs                        ║
║   • Playground: http://${HOST}:${PORT}/playground            ║
║                                                              ║
║   Note: Using simple HTTP server (CNZR package issue)      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});
