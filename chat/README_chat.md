# WebSocket Chat

Un'applicazione di chat in tempo reale basata su WebSocket, sviluppata con React e TypeScript. Utilizza `react-use-websocket` per gestire la connessione WebSocket e lo scambio di messaggi.

## Funzionalità

- Connessione WebSocket con riconnessione automatica
- Invio e ricezione di messaggi in tempo reale
- UI responsive con chatbox scrollabile

## Tecnologie

- **React** + **TypeScript**
- **react-use-websocket** per la comunicazione WebSocket
- **Tailwind CSS** per lo stile

## WebSocket

L'hook `useWebSocket` gestisce la connessione WebSocket, mantenendo lo stato del socket e permettendo di inviare e ricevere messaggi in tempo reale:

```tsx
const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<Msg>(
  WS_URL,
  {
    shouldReconnect: () => true,
  }
);
```

- `sendJsonMessage(data)`: invia un messaggio JSON al server
- `lastJsonMessage`: ultimo messaggio ricevuto dal server
- `readyState`: stato della connessione WebSocket

---

## Installazione

1. Clona il repository e installa le dipendenze:
   ```bash
   git clone https://github.com/tuo-username/websocket-chat.git
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

---

Creato da Giovanni Girelli
