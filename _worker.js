// Cloudflare Workers adapter for CNZR Framework
// This file adapts the Node.js server to run on Cloudflare Workers

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static files from public directory
    if (url.pathname.startsWith('/output.css') || 
        url.pathname.startsWith('/styles.css') ||
        url.pathname.startsWith('/app.js') ||
        url.pathname.startsWith('/app-motion.js') ||
        url.pathname.startsWith('/favicon.svg')) {
      return env.ASSETS.fetch(request);
    }
    
    // Import and run the server
    const { default: handler } = await import('./server-worker.js');
    return handler(request, env, ctx);
  }
};
