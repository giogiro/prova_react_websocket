# WebSocket Chat - Client & Server

Questo repository contiene sia il client che il server di un'applicazione di chat in tempo reale basata su WebSocket.

## Struttura del Progetto

```
/websocket-chat
│── client/     # Applicazione React + TypeScript
│── server/     # Server WebSocket con Node.js e Express
│── README.md   # Documentazione generale
```

## Documentazione

- 📄 [Client README](client/README_chat.md) - Dettagli sul client React
- 📄 [Server README](server/README_server.md) - Dettagli sul server WebSocket

## Tecnologie Utilizzate

### Client

- **React** + **TypeScript**
- **react-use-websocket** per la gestione WebSocket
- **Tailwind CSS** per lo stile

### Server

- **Node.js** + **Express**
- **ws** per la gestione WebSocket

## Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-username/websocket-chat.git
   cd websocket-chat
   ```
2. Installa le dipendenze per il client e il server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Avvia il server WebSocket:
   ```bash
   cd server
   node server.js
   ```
4. Avvia il client:
   ```bash
   cd ../client
   npm run dev
   ```
