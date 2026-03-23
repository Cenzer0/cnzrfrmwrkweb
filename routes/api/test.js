// Example API route
// Handles /api/test

export async function GET(ctx) {
  return ctx.json({
    status: 'success',
    message: 'API test endpoint',
    query: ctx.query,
    timestamp: Date.now()
  });
}

export async function POST(ctx) {
  const data = ctx.body;
  
  return ctx.status(201).json({
    status: 'created',
    received: data,
    timestamp: Date.now()
  });
}

export async function PUT(ctx) {
  return ctx.json({
    status: 'updated',
    body: ctx.body
  });
}

export async function DELETE(ctx) {
  return ctx.json({
    status: 'deleted',
    message: 'Resource deleted successfully'
  });
}
