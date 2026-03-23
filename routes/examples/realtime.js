// Example: Real-time updates simulation

const subscribers = new Set();

export async function GET(ctx) {
  const action = ctx.query.action;
  
  if (action === 'subscribe') {
    // In real app, use WebSocket or SSE
    return ctx.json({
      message: 'Subscribed to real-time updates',
      subscriberId: Date.now(),
      note: 'Use /examples/streaming for actual SSE implementation'
    });
  }
  
  if (action === 'broadcast') {
    const message = ctx.query.message || 'Update';
    
    // Broadcast to all subscribers
    const broadcast = {
      type: 'broadcast',
      message,
      timestamp: Date.now(),
      subscribers: subscribers.size
    };
    
    return ctx.json({
      message: 'Broadcast sent',
      data: broadcast
    });
  }
  
  return ctx.json({
    message: 'Real-time endpoint',
    actions: ['subscribe', 'broadcast'],
    examples: [
      '/examples/realtime?action=subscribe',
      '/examples/realtime?action=broadcast&message=Hello'
    ]
  });
}
