const WebSocket = require('ws');
const jwt = require('./utils/jwt');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');
    
    const token = new URL(req.url, `ws://${req.headers.host}`).searchParams.get('token');

    if (!token) {
      console.error('No token provided');
      return ws.close(1008, 'Authentication token required');
    }

    try {
      const decoded = jwt.verifyToken(token);
      
      if (!decoded.id) {
        throw new Error('Invalid token payload');
      }
      
      ws.userId = decoded.id;
      console.log(`Authenticated WebSocket for user ${decoded.id}`);
    } catch (error) {
      console.error('WebSocket authentication failed', error.message);
      ws.close(1008, 'Authentication failed: ' + error.message);
    }

    ws.on('message', (message) => {
      console.log(`Received message from ${ws.userId}: ${message}`);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
      console.log(`WebSocket disconnected for user ${ws.userId}`);
    });
  });

  return wss;
};
    

module.exports = setupWebSocket;

