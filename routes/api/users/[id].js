// Dynamic route example
// Handles /api/users/:id

export async function GET(ctx) {
  const userId = ctx.params.id;
  
  // Simulate database fetch
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    createdAt: new Date().toISOString()
  };
  
  return ctx.json({
    success: true,
    user
  });
}

export async function PUT(ctx) {
  const userId = ctx.params.id;
  const updates = ctx.body;
  
  return ctx.json({
    success: true,
    message: `User ${userId} updated`,
    updates
  });
}

export async function DELETE(ctx) {
  const userId = ctx.params.id;
  
  return ctx.json({
    success: true,
    message: `User ${userId} deleted`
  });
}
