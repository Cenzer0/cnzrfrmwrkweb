// Catch-all route example
// Handles /api/advanced/* routes

export async function GET(ctx) {
  const slug = ctx.params.slug || [];
  
  return ctx.json({
    message: 'Catch-all route',
    slug: slug,
    fullPath: `/api/advanced/${slug.join('/')}`,
    example: 'Try /api/advanced/any/path/you/want'
  });
}

export async function POST(ctx) {
  const slug = ctx.params.slug || [];
  const body = ctx.body;
  
  return ctx.json({
    message: 'POST to catch-all route',
    slug,
    receivedData: body
  });
}
