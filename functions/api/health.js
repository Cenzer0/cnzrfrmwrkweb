// Cloudflare Pages Function for /api/health endpoint

export async function onRequest(context) {
  return new Response(JSON.stringify({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CNZR Framework',
    version: '2.5.2',
    uptime: process.uptime ? Math.floor(process.uptime()) : 0
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}
