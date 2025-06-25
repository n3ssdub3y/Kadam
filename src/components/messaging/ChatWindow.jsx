import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "./Messaging.css";

export default function ChatWindow({ selectedUser }) {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="user-info">
          <div className="user-avatar">
            {selectedUser.photoURL ? (
              <img src={selectedUser.photoURL} alt={selectedUser.name} />
            ) : (
              <span>{selectedUser.name?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h4>{selectedUser.name || selectedUser.username}</h4>
            <div className="user-status">Online</div>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-button">📞</button>
          <button className="action-button">⋮</button>
        </div>
      </div>
      <MessageList selectedUser={selectedUser} />
      <MessageInput selectedUser={selectedUser} />
    </div>
  );
}