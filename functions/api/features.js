// Cloudflare Pages Function for /api/features endpoint

export async function onRequest(context) {
  const features = [
    {
      id: 1,
      name: 'Advanced Routing',
      description: 'File-based routing with dynamic parameters and middleware',
      icon: 'route',
      category: 'core'
    },
    {
      id: 2,
      name: 'Plugin System',
      description: 'Extensible architecture with powerful hooks',
      icon: 'puzzle',
      category: 'core'
    },
    {
      id: 3,
      name: 'TypeScript First',
      description: 'Built with TypeScript for superior DX',
      icon: 'code',
      category: 'developer'
    },
    {
      id: 4,
      name: 'Session & Cookies',
      description: 'Built-in session and cookie management',
      icon: 'cookie',
      category: 'security'
    },
    {
      id: 5,
      name: 'Security Built-in',
      description: 'CORS, security headers, and validation',
      icon: 'shield',
      category: 'security'
    },
    {
      id: 6,
      name: 'Lightning Fast',
      description: 'Optimized performance with compression and caching',
      icon: 'zap',
      category: 'performance'
    }
  ];

  return new Response(JSON.stringify(features), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
