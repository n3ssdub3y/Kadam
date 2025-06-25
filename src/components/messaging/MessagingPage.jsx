import React, { useState } from "react";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import "./Messaging.css";

export default function MessagingPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging-page">
      <UserList onSelectUser={setSelectedUser} />
      {selectedUser ? (
        <ChatWindow selectedUser={selectedUser} />
      ) : (
        <div className="no-selected-user">
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h3>Select a user to start chatting</h3>
            <p>Connect with partners and supporters</p>
          </div>
        </div>
      )}
    </div>
  );
}