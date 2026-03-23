// Request validation middleware

export const validateEmail = (ctx, next) => {
  const { email } = ctx.body;
  
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw ctx.createError(400, 'Invalid email address');
  }
  
  return next();
};

export const validateRequired = (fields) => {
  return (ctx, next) => {
    const missing = [];
    
    for (const field of fields) {
      if (!ctx.body[field]) {
        missing.push(field);
      }
    }
    
    if (missing.length > 0) {
      throw ctx.createError(400, `Missing required fields: ${missing.join(', ')}`);
    }
    
    return next();
  };
};

export const validateJSON = (ctx, next) => {
  const contentType = ctx.req.headers['content-type'];
  
  if (!contentType || !contentType.includes('application/json')) {
    throw ctx.createError(400, 'Content-Type must be application/json');
  }
  
  return next();
};

export const sanitizeInput = (ctx, next) => {
  if (ctx.body && typeof ctx.body === 'object') {
    for (const key in ctx.body) {
      if (typeof ctx.body[key] === 'string') {
        // Basic XSS prevention
        ctx.body[key] = ctx.body[key]
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      }
    }
  }
  
  return next();
};
