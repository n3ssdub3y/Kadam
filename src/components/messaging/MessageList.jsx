import React, { useEffect, useState, useRef } from "react";
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Messaging.css";

export default function MessageList({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser || !currentUser?.uid) return;

    const receiverId = selectedUser.uid || selectedUser.id;
    const chatId = [currentUser.uid, receiverId].sort().join("_");

    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsub();
  }, [selectedUser, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="no-messages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-container ${msg.senderId === currentUser.uid ? "sent" : "received"}`}
          >
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}