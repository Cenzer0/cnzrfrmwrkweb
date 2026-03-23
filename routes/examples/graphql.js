// Example: GraphQL-style query endpoint

export async function POST(ctx) {
  const { query, variables } = ctx.body;
  
  if (!query) {
    throw ctx.createError(400, 'Query is required');
  }
  
  // Simple query parser (demo only)
  const result = {
    data: null,
    errors: []
  };
  
  try {
    // Parse query (simplified)
    if (query.includes('user')) {
      result.data = {
        user: {
          id: variables?.id || 1,
          name: 'John Doe',
          email: 'john@example.com'
        }
      };
    } else if (query.includes('stats')) {
      result.data = {
        stats: {
          version: '2.5.2',
          downloads: '10K+',
          stars: '500+'
        }
      };
    } else {
      result.errors.push({
        message: 'Unknown query',
        locations: [{ line: 1, column: 1 }]
      });
    }
  } catch (error) {
    result.errors.push({
      message: error.message
    });
  }
  
  return ctx.json(result);
}

export async function GET(ctx) {
  return ctx.json({
    message: 'GraphQL-style endpoint',
    note: 'POST queries to this endpoint',
    example: {
      query: '{ user(id: 1) { name email } }',
      variables: { id: 1 }
    }
  });
}
