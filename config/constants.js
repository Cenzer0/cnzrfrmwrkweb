// Application constants

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
  MONTH: 2592000 // 30 days
};

export const RATE_LIMITS = {
  DEFAULT: { max: 100, window: 60000 }, // 100 req/min
  AUTH: { max: 5, window: 60000 }, // 5 req/min
  API: { max: 1000, window: 60000 }, // 1000 req/min
  STRICT: { max: 10, window: 60000 } // 10 req/min
};

export const SESSION_CONFIG = {
  SECRET: process.env.SESSION_SECRET || 'change-this-secret',
  MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  COOKIE_NAME: 'cnzr.sid'
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  INTERNAL_ERROR: 'Internal server error',
  RATE_LIMIT: 'Too many requests',
  VALIDATION_ERROR: 'Validation failed'
};

export const SUCCESS_MESSAGES = {
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  LOGIN: 'Login successful',
  LOGOUT: 'Logout successful'
};

export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2',
  CURRENT: 'v1'
};

export const CONTENT_TYPES = {
  JSON: 'application/json',
  HTML: 'text/html',
  TEXT: 'text/plain',
  XML: 'application/xml',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data'
};
