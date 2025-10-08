// chatServer.js
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.end('WebSocket Chat Server Running');
});
const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on('connection', ws => {
  clients.add(ws);
  ws.send(JSON.stringify({ system: 'Welcome to chat!' }));

  ws.on('message', msg => {
    const data = { user: msg, time: new Date().toLocaleTimeString() };
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
    }
  });

  ws.on('close', () => clients.delete(ws));
});

server.listen(8080, () => console.log('Chat server running on port 8080'));
