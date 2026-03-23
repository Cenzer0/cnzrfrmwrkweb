#!/usr/bin/env node

/**
 * CNZR CLI - Route Generator
 * Command: cnzr generate <route-name> [options]
 */

import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';

const templates = {
  basic: 'Basic route handler',
  api: 'API endpoint with CRUD operations',
  crud: 'Full CRUD resource',
  fullstack: 'SSR + API endpoint',
  error: 'Error page handler'
};

export async function generateRoute(routeName, options = {}) {
  const {
    template = 'basic',
    status = 404
  } = options;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR Route Generator                                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Generating route: ${routeName}
Template: ${template}
`);

  try {
    const routePath = join(process.cwd(), 'routes', `${routeName}.js`);
    const routeDir = dirname(routePath);

    // Create directory if needed
    await mkdir(routeDir, { recursive: true });

    let code = '';

    switch (template) {
      case 'basic':
        code = generateBasicRoute(routeName);
        break;
      case 'api':
        code = generateApiRoute(routeName);
        break;
      case 'crud':
        code = generateCrudRoute(routeName);
        break;
      case 'fullstack':
        code = generateFullstackRoute(routeName);
        break;
      case 'error':
        code = generateErrorRoute(status);
        break;
      default:
        throw new Error(`Unknown template: ${template}`);
    }

    await writeFile(routePath, code);
    console.log(`✅ Generated route: ${routePath}`);

    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ✨ Route generated successfully!                          ║
║                                                              ║
║   File: routes/${routeName}.js                              ║
║   Template: ${template}                                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

  } catch (error) {
    console.error('❌ Error generating route:', error.message);
    process.exit(1);
  }
}

function generateBasicRoute(routeName) {
  return `// Basic route: /${routeName}

export async function GET(ctx) {
  return ctx.json({
    message: 'Hello from ${routeName}',
    timestamp: Date.now()
  });
}

export async function POST(ctx) {
  const data = ctx.body;
  
  return ctx.status(201).json({
    message: 'Created',
    data
  });
}
`;
}

function generateApiRoute(routeName) {
  return `// API route: /api/${routeName}

export async function GET(ctx) {
  // List all items
  return ctx.json({
    data: [],
    total: 0
  });
}

export async function POST(ctx) {
  // Create new item
  const item = ctx.body;
  
  return ctx.status(201).json({
    message: 'Item created',
    data: item
  });
}

export async function PUT(ctx) {
  // Update item
  const item = ctx.body;
  
  return ctx.json({
    message: 'Item updated',
    data: item
  });
}

export async function DELETE(ctx) {
  // Delete item
  return ctx.status(204).json({});
}
`;
}

function generateCrudRoute(routeName) {
  return `// CRUD route: /${routeName}

// In-memory storage (replace with database)
const items = new Map();
let nextId = 1;

// List all
export async function GET(ctx) {
  const page = parseInt(ctx.query.page) || 1;
  const limit = parseInt(ctx.query.limit) || 10;
  
  const allItems = Array.from(items.values());
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return ctx.json({
    data: allItems.slice(start, end),
    pagination: {
      page,
      limit,
      total: allItems.length
    }
  });
}

// Create
export async function POST(ctx) {
  const item = {
    id: String(nextId++),
    ...ctx.body,
    createdAt: new Date().toISOString()
  };
  
  items.set(item.id, item);
  
  return ctx.status(201).json({
    message: 'Created',
    data: item
  });
}

// Update
export async function PUT(ctx) {
  const id = ctx.params.id;
  const item = items.get(id);
  
  if (!item) {
    throw ctx.createError(404, 'Item not found');
  }
  
  const updated = {
    ...item,
    ...ctx.body,
    updatedAt: new Date().toISOString()
  };
  
  items.set(id, updated);
  
  return ctx.json({
    message: 'Updated',
    data: updated
  });
}

// Delete
export async function DELETE(ctx) {
  const id = ctx.params.id;
  
  if (!items.has(id)) {
    throw ctx.createError(404, 'Item not found');
  }
  
  items.delete(id);
  
  return ctx.status(204).json({});
}
`;
}

function generateFullstackRoute(routeName) {
  return `// Fullstack route: /${routeName}
// Contains both SSR and API handlers

// Server-rendered page
export async function GET(ctx) {
  // Check if requesting JSON
  const acceptsJson = ctx.req.headers.accept?.includes('application/json');
  
  if (acceptsJson) {
    // Return JSON data for fetch requests
    return ctx.json({
      title: '${routeName}',
      data: [],
      timestamp: Date.now()
    });
  }
  
  // Return HTML page
  return ctx.render('${routeName}', {
    title: '${routeName}',
    message: 'Fullstack route'
  });
}

// API endpoint for data
export async function POST(ctx) {
  const data = ctx.body;
  
  return ctx.status(201).json({
    message: 'Data received',
    data
  });
}
`;
}

function generateErrorRoute(status) {
  return `// Error handler: ${status}

export async function GET(ctx) {
  return ctx.status(${status}).render('error', {
    status: ${status},
    message: '${getErrorMessage(status)}',
    title: 'Error ${status}'
  });
}

function getErrorMessage(status) {
  const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return messages[status] || 'Error';
}
`;
}

function getErrorMessage(status) {
  const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return messages[status] || 'Error';
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const routeName = args[0];
  
  if (!routeName) {
    console.error('❌ Route name is required');
    console.log('Usage: cnzr generate <route-name> [options]');
    process.exit(1);
  }

  const options = {
    template: args.includes('--template') 
      ? args[args.indexOf('--template') + 1] 
      : 'basic',
    status: args.includes('--status')
      ? parseInt(args[args.indexOf('--status') + 1])
      : 404
  };

  generateRoute(routeName, options);
}
