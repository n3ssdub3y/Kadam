import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch users from Firestore
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out logged-in user
      const otherUsers = fetched.filter((u) => u.id !== currentUser.uid);
      setUsers(otherUsers);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <div style={{ width: "250px", padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h4>👥 Usernames</h4>
      {users.length === 0 ? (
        <p style={{ color: "gray" }}>No other users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            style={{
              cursor: "pointer",
              padding: "8px 0",
              borderBottom: "1px solid #eee"
            }}
          >
            @{user.username || "Unknown"}
          </div>
        ))
      )}
    </div>
  );
}
