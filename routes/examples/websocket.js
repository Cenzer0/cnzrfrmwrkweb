// Example: WebSocket info endpoint
// Note: Actual WebSocket requires ws library integration

export async function GET(ctx) {
  return ctx.json({
    message: 'WebSocket endpoint info',
    note: 'To use WebSocket with CNZR, integrate ws library',
    example: {
      install: 'npm install ws',
      usage: 'See docs/EXAMPLES.md for WebSocket integration'
    },
    alternativeSSE: '/examples/streaming'
  });
}
