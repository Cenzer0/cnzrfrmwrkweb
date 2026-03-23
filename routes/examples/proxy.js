// Example: Proxy/Forward requests

export async function GET(ctx) {
  const targetUrl = ctx.query.url;
  
  if (!targetUrl) {
    throw ctx.createError(400, 'URL parameter required');
  }
  
  try {
    // In real implementation, use fetch or axios
    return ctx.json({
      message: 'Proxy endpoint',
      note: 'This is a demo. Integrate fetch/axios for actual proxying',
      targetUrl,
      example: {
        usage: '/examples/proxy?url=https://api.example.com/data',
        implementation: 'const response = await fetch(targetUrl); return ctx.json(await response.json());'
      }
    });
  } catch (error) {
    throw ctx.createError(500, `Proxy error: ${error.message}`);
  }
}
