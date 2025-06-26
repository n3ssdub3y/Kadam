import React, { useEffect, useState, useRef } from "react";
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc as firestoreDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Messaging.css";

export default function MessageList({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [showConfirmId, setShowConfirmId] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser || !currentUser?.uid) return;

    const receiverId = selectedUser.uid || selectedUser.id;
    const chatId = [currentUser.uid, receiverId].sort().join("_");

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
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

  const handleDelete = async (msgId) => {
    try {
      const receiverId = selectedUser.uid || selectedUser.id;
      const chatId = [currentUser.uid, receiverId].sort().join("_");
      await deleteDoc(
        firestoreDoc(db, "chats", chatId, "messages", msgId)
      );
      setShowConfirmId(null);
    } catch (err) {
      console.error("Error deleting message:", err);
    }
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
            className={`message-container ${
              msg.senderId === currentUser.uid ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
            {msg.senderId === currentUser.uid && (
              <div className="delete-container">
                {showConfirmId === msg.id ? (
                  <>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="confirm-delete"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirmId(null)}
                      className="cancel-delete"
                    >
                      No
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowConfirmId(msg.id)}
                    className="delete-btn"
                    title="Delete message"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
