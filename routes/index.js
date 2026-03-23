// File-based routing example
// This file handles GET /

export default function handler(ctx) {
  return ctx.json({
    message: 'File-based routing works!',
    route: '/',
    timestamp: new Date().toISOString()
  });
}

// Or use HTTP method exports
export async function GET(ctx) {
  return ctx.json({
    message: 'GET request to root',
    features: ['file-based routing', 'modern context API']
  });
}
