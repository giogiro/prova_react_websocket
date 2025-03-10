# 💬 WebSocket Chat

Un'applicazione di chat in tempo reale basata su WebSocket, sviluppata con React e TypeScript. Utilizza `react-use-websocket` per gestire la connessione WebSocket e un server Node.js con `ws` ed `express`.

## 🚀 Funzionalità

- Connessione WebSocket con riconnessione automatica
- Invio e ricezione di messaggi in tempo reale
- UI responsive con chatbox scrollabile

## 🛠 Tecnologie

- **React** + **TypeScript**
- **react-use-websocket** per la comunicazione WebSocket
- **Tailwind CSS** per lo stile
- **Node.js**, **Express**, **ws** per il server WebSocket

## 🔌 Server WebSocket

Il server WebSocket è basato su Node.js e gestisce le connessioni con `ws` ed `express`:

```javascript
const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🟢 Un client si è connesso!");

  ws.on("message", (message) => {
    console.log(`📩 Messaggio ricevuto: ${message}`);

    try {
      const parsedMessage = JSON.parse(message.toString());
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedMessage));
        }
      });
    } catch (error) {
      console.log("Errore nella decodifica del messaggio:", error);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Un client si è disconnesso");
  });
});

server.listen(8080, () => {
  console.log("🚀 WebSocket Server in ascolto su ws://localhost:8080");
});
```

## 📦 Installazione

1. Clona il repository e installa le dipendenze:
   ```bash
   cd websocket-chat
   npm install
   ```
2. Avvia il server WebSocket:
   ```bash
   node server.js
   ```
3. Avvia l'applicazione client:
   ```bash
   npm run dev
   ```

## 📜 Licenza

Rilasciato sotto licenza **MIT**.

---

Creato con ❤️ da [Il Tuo Nome]
