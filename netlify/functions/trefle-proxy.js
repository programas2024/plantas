// netlify/functions/trefle-proxy.js
const TREFLETOKEN = 'L3V7VeThnOso2GVtTMe7EGV2Qibphlbd4IkCopNkJiE';

exports.handler = async function(event, context) {
  // Habilitar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { q } = event.queryStringParameters;
  
  if (!q) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Parámetro de búsqueda (q) requerido' })
    };
  }

  try {
    const response = await fetch(`https://trefle.io/api/v1/plants/search?token=${TREFLETOKEN}&q=${encodeURIComponent(q)}`);
    
    if (!response.ok) {
      throw new Error(`Error de Trefle: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};