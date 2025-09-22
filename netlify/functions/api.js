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

    // Filter and limit the response to reduce size
    if (data.response && data.response.docs) {
      // Take only first 50 articles and essential fields
      data.response.docs = data.response.docs.slice(0, 50).map(article => ({
        _id: article._id,
        abstract: article.abstract,
        web_url: article.web_url,
        pub_date: article.pub_date,
        source: article.source,
        headline: article.headline,
        multimedia: article.multimedia ? article.multimedia.slice(0, 3) : [] // Limit multimedia
      }));
    }

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