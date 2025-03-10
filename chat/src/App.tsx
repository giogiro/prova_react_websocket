import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket"

interface Msg {
  event: string,
  name: string,
  data: string
}

export default function App() {
  const WS_URL = "ws://localhost:8080"

  const [messageHistory, setMessageHistory] = useState < Msg[] > ([])
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<Msg>(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

    // Run when the connection state (readyState) changes
    useEffect(() => {
      console.log("Connection state changed")
      if (readyState === ReadyState.OPEN) {
        sendJsonMessage({
          event: "subscribe",
          data:  "general-chatroom",
        })
      }
    }, [readyState]
  )

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if(lastJsonMessage !== null && lastJsonMessage.event !== "subscribe"){
      console.log("Nuovo messaggio ricevuto: ", lastJsonMessage);
      setMessageHistory((prev) => [...prev, lastJsonMessage]);
      console.log(lastJsonMessage?.data)
    }

  }, [lastJsonMessage])

  const sendMessage = () => {
    if(readyState !== ReadyState.OPEN){
      window.alert("Non sei connesso al server!");
      return
    }

    if (input.trim() !== "") {
      sendJsonMessage({
        event: "message",
        name: name,
        data: input,
      }); // Invia messaggio al server WebSocket
      setInput("");
    }
  };


  // Funzione per abilitare/disabilitare il bottone quando il nome è stato inserito
  const handleNameSubmit = () => {
    if (name !== "") {
      setEnabled(true); // Abilita il bottone se il nome è stato inserito
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">💬 WebSocket Chat</h2>
      
        {/* Inputo Nome */}
        <div className="w-full max-w-md flex mt-4 space-x-2">
          <input 
            type="text"
            className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Scegli un nome..."
          />
          <button 
            onClick={handleNameSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
          >
            Conferma
          </button>
        </div>

      {/* Chat Box */}
      <div className="w-full max-w-md border border-gray-700 rounded-lg p-4 h-64 overflow-y-auto bg-gray-800">
        {messageHistory.map((message, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
            {message.name} -{">"} {message.data} {/* O usa un formato adatto a message */}
          </div>
        ))}
    </div>


      {/* Input e Bottone */}
      <div className="w-full max-w-md flex mt-4 space-x-2">
        <input 
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi un messaggio..."
        />
        <button 
          onClick={sendMessage}
          disabled={!enabled} // Disabilita il bottone se non abilitato
          className={`px-4 py-2 rounded-lg font-semibold ${     //posso usare ternario anche qua!
            enabled ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-500 cursor-not-allowed opacity-50"
          }`}>
          {enabled? "Invia" : "Inserisci nome"}
        </button>
      </div>
      <div className="flex item-center mt-5 gap-4">
        <div className={`w-10 h-10 rounded-full ${
          readyState !== ReadyState.OPEN ? "bg-red-600" :"bg-green-600"
        }`}>   
        </div>
        <h5 className="text-2xl font-bold mb-4">Connessione server</h5>
      </div>
    </div>
  );
}
