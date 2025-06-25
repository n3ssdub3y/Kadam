// components/messaging/ChatWindow.jsx
import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({ selectedUser }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "1rem" }}>
      <h4>Chat with {selectedUser.name}</h4>
      <MessageList selectedUser={selectedUser} />
      <MessageInput selectedUser={selectedUser} />
    </div>
  );
}
