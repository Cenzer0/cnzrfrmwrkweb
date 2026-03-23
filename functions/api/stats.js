// Cloudflare Pages Function for /api/stats endpoint

export async function onRequest(context) {
  const stats = {
    version: '2.5.2',
    downloads: '10,000+',
    stars: '500+',
    contributors: 15,
    plugins: 6,
    routes: 30,
    uptime: '99.9%',
    responseTime: '45ms',
    features: [
      'Advanced Routing',
      'Plugin System',
      'TypeScript Support',
      'Session Management',
      'Built-in Security',
      'Performance Optimized'
    ]
  };

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
