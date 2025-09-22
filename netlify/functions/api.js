exports.handler = async (event, context) => {
  const { path, queryStringParameters } = event;

  // Extract the API path after /api/
  const apiPath = path.replace('/api/', '');

  // Build NY Times API URL (apiPath already contains 'svc/')
  const nytimesUrl = `https://api.nytimes.com/${apiPath}`;
  const params = new URLSearchParams(queryStringParameters || {});
  const fullUrl = `${nytimesUrl}?${params.toString()}`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to fetch from NY Times API' }),
    };
  }
};