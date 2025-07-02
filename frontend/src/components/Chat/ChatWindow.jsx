import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { io } from 'socket.io-client';
import api from '../../utils/api';

export default function ChatWindow({ otherUserId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    // load history
    api.get(`/chat/${otherUserId}`).then(res => setMessages(res.data));
    // connect socket
    const socket = io(import.meta.env.VITE_API_BASE_URL.replace('/api',''), { auth: { token: localStorage.getItem('token') } });
    socketRef.current = socket;
    socket.on('private_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.disconnect();
  }, [otherUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMsg = () => {
    if (!input) return;
    const msg = { toUserId: otherUserId, message: input };
    socketRef.current.emit('private_message', msg);
    setMessages(prev => [...prev, { from: user.id, message: input, timestamp: new Date() }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-xs p-2 rounded-lg ${m.from === user.id ? 'bg-green-100 self-end' : 'bg-gray-200 self-start'}`}> 
            <p>{m.message}</p>
            <span className="text-xs text-gray-500">{new Date(m.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg p-2 focus:ring transition-shadow"
          placeholder="Type a message"
        />
        <button onClick={sendMsg} className="ml-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">Send</button>
      </div>
    </div>
}

