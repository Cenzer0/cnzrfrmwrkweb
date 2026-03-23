// Cloudflare Pages Function for /api/feedback endpoint

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    
    // Validate input
    if (!body.name || !body.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Name and message are required'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // In production, you would save this to a database or send to an email service
    // For now, we'll just return a success response
    
    const feedback = {
      id: Date.now(),
      name: body.name,
      email: body.email || null,
      message: body.message,
      timestamp: new Date().toISOString(),
      status: 'received'
    };

    // TODO: Store in KV, D1, or send via email
    // await context.env.FEEDBACK_KV.put(`feedback:${feedback.id}`, JSON.stringify(feedback));

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your feedback!',
      id: feedback.id
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process feedback'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

// Handle GET requests
export async function onRequestGet(context) {
  return new Response(JSON.stringify({
    message: 'Use POST method to submit feedback',
    example: {
      name: 'Your Name',
      email: 'your@email.com',
      message: 'Your feedback here'
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
