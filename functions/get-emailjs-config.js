export const handler = async (event, context) => {
  try {
    // Get EmailJS configuration from environment variables
    const emailjsConfig = {
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      serviceId: process.env.EMAILJS_SERVICE_ID
    };

    // Check if all required keys are present
    const missingKeys = Object.entries(emailjsConfig)
      .filter(([key, value]) => !value || value.startsWith('your_'))
      .map(([key]) => key);

    if (missingKeys.length > 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          configured: false,
          missingKeys: missingKeys,
          message: 'EmailJS not fully configured'
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        configured: true,
        config: emailjsConfig
      })
    };
  } catch (error) {
    console.error('Error getting EmailJS config:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        configured: false,
        error: 'Failed to get EmailJS configuration'
      })
    };
  }
}; 