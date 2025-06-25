import React, { useState } from "react";
import { db } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./Messaging.css";

export default function MessageInput({ selectedUser }) {
  const [text, setText] = useState("");
  const auth = getAuth();
  const senderId = auth.currentUser.uid;
  const receiverId = selectedUser.uid || selectedUser.id;
  const chatId = [senderId, receiverId].sort().join("_");

  const sendMessage = async (e) => {
    e.preventDefault();
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
    <form className="message-input" onSubmit={sendMessage}>
      <div className="input-container">
        <button type="button" className="attachment-button">📎</button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
        />
      </div>
      <button type="submit" className="send-button">
        <span>Send</span>
        <span className="send-icon"> ➤</span>
      </button>
    </form>
  );
}