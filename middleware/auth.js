// Authentication middleware examples

export const requireAuth = (ctx, next) => {
  const isAuthenticated = ctx.session.get('isAuthenticated');
  
  if (!isAuthenticated) {
    throw ctx.createError(401, 'Authentication required');
  }
  
  return next();
};

export const requireAdmin = (ctx, next) => {
  const user = ctx.session.get('user');
  
  if (!user || user.role !== 'admin') {
    throw ctx.createError(403, 'Admin access required');
  }
  
  return next();
};

export const optionalAuth = (ctx, next) => {
  const isAuthenticated = ctx.session.get('isAuthenticated');
  ctx.state.isAuthenticated = isAuthenticated || false;
  return next();
};

export const apiKeyAuth = (ctx, next) => {
  const apiKey = ctx.req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw ctx.createError(401, 'Invalid API key');
  }
  
  return next();
};
