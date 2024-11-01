import React, { useState, useEffect } from "react";
import axios from "axios";

type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
};

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/me/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || receiverId === null) return;

    try {
      const response = await axios.post(`http://localhost:3000/users/${receiverId}/messages`, {
        content: newMessage,
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
      setReceiverId(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      {/* Send Message */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Receiver ID"
          value={receiverId || ""}
          onChange={(e) => setReceiverId(Number(e.target.value))}
          className="p-2 border rounded mr-2"
        />
        <input
          type="text"
          placeholder="Message content"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send Message
        </button>
      </div>

      {/* Display Messages */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Your Messages</h2>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="mb-4 border-b pb-2">
              <p>
                <strong>From:</strong> User {message.senderId}
              </p>
              <p>
                <strong>To:</strong> User {message.receiverId}
              </p>
              <p>{message.content}</p>
              <p className="text-gray-500 text-sm">{message.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
