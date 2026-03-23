// Example: Batch API requests

export async function POST(ctx) {
  const { requests } = ctx.body;
  
  if (!Array.isArray(requests)) {
    throw ctx.createError(400, 'requests must be an array');
  }
  
  // Process batch requests
  const results = await Promise.all(
    requests.map(async (req, index) => {
      try {
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return {
          index,
          success: true,
          data: {
            request: req,
            processed: true,
            timestamp: Date.now()
          }
        };
      } catch (error) {
        return {
          index,
          success: false,
          error: error.message
        };
      }
    })
  );
  
  return ctx.json({
    message: 'Batch processing complete',
    total: requests.length,
    successful: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results
  });
}
