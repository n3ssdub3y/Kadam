// components/messaging/MessagingPage.jsx
import React, { useState } from "react";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";


export default function MessagingPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging-page" style={{ display: "flex", height: "90vh" }}>
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser ? (
        <ChatWindow selectedUser={selectedUser} />
      ) : (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>
          Select a user to start chatting 💬
        </div>
      )}
    </div>
  );
}
