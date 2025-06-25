// components/messaging/MessageInput.jsx
import React, { useState } from "react";
import { db } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function MessageInput({ selectedUser }) {
  const [text, setText] = useState("");
  const auth = getAuth();
  const senderId = auth.currentUser.uid;
  const receiverId = selectedUser.uid || selectedUser.id;

  const chatId = [senderId, receiverId].sort().join("_");

  const sendMessage = async () => {
    if (!text.trim()) return;

    await setDoc(
      doc(db, "chats", chatId),
      {
        users: [senderId, receiverId].sort(),
        lastMessage: text,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId,
      text,
      timestamp: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div style={{ display: "flex", padding: "0.5rem", borderTop: "1px solid #ccc" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
        style={{ flex: 1, padding: "0.5rem" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "0.5rem" }}>
        Send
      </button>
    </div>
  );
}
