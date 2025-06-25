import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function MessageList({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [showConfirmId, setShowConfirmId] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

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

  const handleDelete = async (msgId) => {
    try {
      const receiverId = selectedUser.uid || selectedUser.id;
      const chatId = [currentUser.uid, receiverId].sort().join("_");
      await deleteDoc(doc(db, "chats", chatId, "messages", msgId));
      setShowConfirmId(null); // hide confirm UI
    } catch (err) {
      console.error("❌ Error deleting message:", err);
    }
  };

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
              position: "relative",
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

            {/* Delete button and confirmation */}
            {msg.senderId === currentUser.uid && (
              <span style={{ marginLeft: "6px" }}>
                {showConfirmId === msg.id ? (
                  <span style={{ marginLeft: "8px" }}>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      style={{ fontSize: "0.8rem", color: "white", backgroundColor: "red", border: "none", borderRadius: "5px", padding: "2px 6px", marginRight: "4px" }}
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => setShowConfirmId(null)}
                      style={{ fontSize: "0.8rem", color: "white", backgroundColor: "gray", border: "none", borderRadius: "5px", padding: "2px 6px" }}
                    >
                      ❌
                    </button>
                  </span>
                ) : (
                  <button
                    onClick={() => setShowConfirmId(msg.id)}
                    style={{
                      fontSize: "0.8rem",
                      color: "red",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Delete message"
                  >
                    🗑️
                  </button>
                )}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
