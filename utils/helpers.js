// Utility helper functions

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date) => {
  return new Date(date).toISOString();
};

export const paginate = (array, page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: array.slice(start, end),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
      hasNext: end < array.length,
      hasPrev: page > 1
    }
  };
};

export const asyncHandler = (fn) => {
  return async (ctx, next) => {
    try {
      await fn(ctx, next);
    } catch (error) {
      throw ctx.createError(error.status || 500, error.message);
    }
  };
};

export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const parseQueryParams = (query) => {
  const params = {};
  
  for (const [key, value] of Object.entries(query)) {
    // Try to parse as number
    if (!isNaN(value)) {
      params[key] = Number(value);
    }
    // Try to parse as boolean
    else if (value === 'true' || value === 'false') {
      params[key] = value === 'true';
    }
    // Keep as string
    else {
      params[key] = value;
    }
  }
  
  return params;
};

export const createResponse = (data, message = 'Success', status = 200) => {
  return {
    success: status < 400,
    status,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

export const createError = (message, status = 500, details = null) => {
  return {
    success: false,
    status,
    message,
    details,
    timestamp: new Date().toISOString()
  };
};
