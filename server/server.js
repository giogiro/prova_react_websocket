const WebSocket = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('🟢 Un client si è connesso!');

    ws.on('message', (message) => {
        console.log(`📩 Messaggio ricevuto: ${message}`);
    
        try {
            // Decodifica il messaggio se è in formato Buffer
            const parsedMessage = JSON.parse(message.toString());
    
            // Invia il messaggio a tutti i client connessi
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(parsedMessage)); // Serializza prima di inviare
                }
            });
        } catch (error) {
            console.log('Errore nella decodifica del messaggio:', error);
        }
    });

    ws.on('close', () => {
        console.log('🔴 Un client si è disconnesso');
    });
});

server.listen(8080, () => {
    console.log('🚀 WebSocket Server in ascolto su ws://localhost:8080');
});
