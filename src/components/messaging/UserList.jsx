import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc as firestoreDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Messaging.css";

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

 useEffect(() => {
  if (!currentUser) return;

  const unsubscribe = onSnapshot(collection(db, "Users"), async (snapshot) => {
    const userDocs = snapshot.docs.filter(
      (docSnap) => docSnap.data().uid !== currentUser.uid
    );

    const userPromises = userDocs.map(async (docSnap) => {
      const userData = docSnap.data();
      const user = { id: docSnap.id, ...userData };

      // ✅ Use correct UID for chat ID
      const chatId = [currentUser.uid, user.uid].sort().join("_");
      const chatRef = firestoreDoc(db, "chats", chatId);

      try {
        // ✅ Profile picture
        const profileRef = firestoreDoc(db, "Users", user.id, "pics", "profile");
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          user.photoURL = profileSnap.data().logoURL;
        }

        // ✅ Chat metadata
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          const chatData = chatSnap.data();
          user.updatedAt = chatData.updatedAt?.toMillis?.() || 0;
          user.unread = chatData.unreadCounts?.[currentUser.uid] || 0;
        } else {
          user.updatedAt = 0;
          user.unread = 0;
        }

      } catch (error) {
        console.error("Error fetching user/chat info:", error);
        user.updatedAt = 0;
        user.unread = 0;
      }

      return user;
    });

    // ✅ Wait for all users
    const userList = await Promise.all(userPromises);

    // ✅ Now sort by updatedAt DESCENDING (recent first)
    const sortedList = userList.sort((a, b) => b.updatedAt - a.updatedAt);

    setUsers(sortedList); // ✅ Ensure sorted list is used in UI
  });

  return unsubscribe;
}, [currentUser]);


  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Messages</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="user-scroll-container">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="user-item"
              onClick={() => onSelectUser(user)}
            >
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.username} />
                ) : (
                  <span>{user.username?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="user-info">
                <div className="user-name" style={{ fontWeight: user.unread > 0 ? "bold" : "normal" }}>
                  @{user.username || "Unknown"}
                </div>
              </div>
              {user.unread > 0 && (
                <span className="unread-badge">{user.unread}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
