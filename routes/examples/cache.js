// Example: Response caching with CNZR

const cache = new Map();

export async function GET(ctx) {
  const key = ctx.query.key || 'default';
  
  // Check cache
  if (cache.has(key)) {
    const cached = cache.get(key);
    
    // Set cache headers
    ctx.res.setHeader('X-Cache', 'HIT');
    ctx.res.setHeader('X-Cache-Age', Date.now() - cached.timestamp);
    
    return ctx.json({
      cached: true,
      data: cached.data,
      cachedAt: cached.timestamp
    });
  }
  
  // Generate new data
  const data = {
    key,
    value: Math.random(),
    timestamp: Date.now()
  };
  
  // Store in cache
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  
  // Set cache headers
  ctx.res.setHeader('X-Cache', 'MISS');
  ctx.res.setHeader('Cache-Control', 'public, max-age=60');
  
  return ctx.json({
    cached: false,
    data
  });
}

export async function DELETE(ctx) {
  const key = ctx.query.key;
  
  if (key) {
    cache.delete(key);
    return ctx.json({ message: `Cache cleared for key: ${key}` });
  }
  
  cache.clear();
  return ctx.json({ message: 'All cache cleared' });
}
