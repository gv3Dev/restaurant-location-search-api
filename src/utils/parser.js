const xml2js = require('xml2js');

async function parseResponse(response) {
    const contentType = response.headers['content-type'];
    if (contentType.includes('application/xml') || contentType.includes('text/xml')) {
      const parser = new xml2js.Parser({ explicitArray: false });
      try {
        const result = await parser.parseStringPromise(response.data);
        return result;
      } catch (error) {
        console.error('Error parsing XML:', error);
        throw error;
      }
    } else if (contentType.includes('application/json')) {
      return response.data;
    } else {
      console.warn('Received response with unexpected Content-Type:', contentType);
      return response.data; 
    }
}

module.exports = parseResponse;