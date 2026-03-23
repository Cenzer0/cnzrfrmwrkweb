// Example: Server-Sent Events (SSE) streaming

export async function GET(ctx) {
  // Set headers for SSE
  ctx.res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Send initial message
  ctx.res.write(`data: ${JSON.stringify({ message: 'Connected to SSE stream' })}\n\n`);

  // Send updates every second
  let count = 0;
  const interval = setInterval(() => {
    count++;
    const data = {
      count,
      timestamp: new Date().toISOString(),
      message: `Update #${count}`
    };
    
    ctx.res.write(`data: ${JSON.stringify(data)}\n\n`);

    // Stop after 10 updates
    if (count >= 10) {
      clearInterval(interval);
      ctx.res.write('data: {"message": "Stream ended"}\n\n');
      ctx.res.end();
    }
  }, 1000);

  // Handle client disconnect
  ctx.req.on('close', () => {
    clearInterval(interval);
  });
}
