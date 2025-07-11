import React, { useState } from "react";

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Halo, ada yang bisa saya bantu?", sender: "farmer" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: message, sender: "me" },
      ]);
      setMessage("");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      <div
        className={`fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-t-lg z-50 transition-transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-green-600 text-white p-3 rounded-t-lg flex justify-between items-center">
          <h3 className="font-semibold">Chat Petani</h3>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="h-80 overflow-y-auto p-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${msg.sender === "me" ? "text-right" : ""}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "me"
                    ? "bg-green-100 text-gray-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 border-t flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-grow p-2 border rounded-l"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 rounded-r"
          >
            Kirim
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
