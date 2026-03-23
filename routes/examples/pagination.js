// Example: Pagination with CNZR

// Mock data
const items = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  value: Math.random()
}));

export async function GET(ctx) {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;
  const sort = ctx.query.sort || 'id';
  const order = ctx.query.order || 'asc';
  
  // Validate
  if (page < 1) {
    throw ctx.createError(400, 'Page must be >= 1');
  }
  
  if (limit < 1 || limit > 100) {
    throw ctx.createError(400, 'Limit must be between 1 and 100');
  }
  
  // Sort
  const sorted = [...items].sort((a, b) => {
    if (order === 'asc') {
      return a[sort] > b[sort] ? 1 : -1;
    }
    return a[sort] < b[sort] ? 1 : -1;
  });
  
  // Paginate
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = sorted.slice(start, end);
  
  const totalPages = Math.ceil(items.length / limit);
  
  // Build pagination links
  const baseUrl = '/examples/pagination';
  const links = {
    self: `${baseUrl}?page=${page}&limit=${limit}`,
    first: `${baseUrl}?page=1&limit=${limit}`,
    last: `${baseUrl}?page=${totalPages}&limit=${limit}`,
    prev: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
    next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null
  };
  
  return ctx.json({
    data,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    },
    links
  });
}
