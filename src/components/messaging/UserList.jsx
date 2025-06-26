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

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

  // Listen to Users collection and fetch nested profile pics, excluding self
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "Users"),
      async (snapshot) => {
        // Exclude current user by matching doc data's uid or doc.id
        const fetched = snapshot.docs
          .filter((docSnap) => {
            const data = docSnap.data();
            return data.uid !== currentUser.uid && docSnap.id !== currentUser.uid;
          })
          .map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

        // Fetch profile pics for each user
        const withPics = await Promise.all(
          fetched.map(async (user) => {
            try {
              const profileRef = firestoreDoc(
                db,
                "Users",
                user.id,
                "pics",
                "profile"
              );
              const profileSnap = await getDoc(profileRef);
              if (profileSnap.exists()) {
                user.photoURL = profileSnap.data().logoURL;
              }
            } catch (err) {
              console.error(`Error fetching pic for ${user.id}:`, err);
            }
            return user;
          })
        );

        setUsers(withPics);
      }
    );

    return unsubscribe;
  }, [currentUser]);

  // Filter based on search term
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
                  <span>
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="user-info">
                <div className="user-name">
                  @{user.username || "Unknown"}
                </div>
              </div>
              {user.unread && (
                <span className="unread-badge">{user.unread}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
