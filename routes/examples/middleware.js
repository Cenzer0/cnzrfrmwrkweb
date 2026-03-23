// Example: Middleware demonstration route

// Custom middleware for this route
const timingMiddleware = (ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const duration = Date.now() - start;
    ctx.res.setHeader('X-Custom-Time', `${duration}ms`);
  });
};

const logMiddleware = (ctx, next) => {
  console.log(`[Middleware] Processing: ${ctx.req.url}`);
  return next();
};

// Export with middleware chain
export const middleware = [timingMiddleware, logMiddleware];

export async function GET(ctx) {
  return ctx.json({
    message: 'Middleware chain example',
    middlewareApplied: ['timingMiddleware', 'logMiddleware'],
    customHeaders: {
      'X-Custom-Time': ctx.res.getHeader('X-Custom-Time')
    },
    state: {
      theme: ctx.state.theme,
      version: ctx.state.version
    }
  });
}
