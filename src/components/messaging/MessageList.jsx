// components/messaging/MessageList.jsx

import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function MessageList({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Ensure both current user and selected user are available
    if (!selectedUser || !currentUser?.uid) {
      console.warn("⏳ Waiting for selectedUser and currentUser...");
      return;
    }

    // Use uid consistently for chatId
    const receiverId = selectedUser.uid || selectedUser.id;
    const chatId = [currentUser.uid, receiverId].sort().join("_");

    console.log("📨 Listening to chat:", chatId);

    // Create Firestore query for messages
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("📥 Messages fetched:", msgs);
      setMessages(msgs);
    });

    return () => unsub();
  }, [selectedUser, currentUser]);

  return (
    <div style={{ flex: 1, overflowY: "auto", margin: "1rem 0", padding: "0.5rem" }}>
      {messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.senderId === currentUser.uid ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                background: msg.senderId === currentUser.uid ? "#dcf8c6" : "#f1f0f0",
                padding: "8px 12px",
                borderRadius: "18px",
                display: "inline-block",
                maxWidth: "60%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
