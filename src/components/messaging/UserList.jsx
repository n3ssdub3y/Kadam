import React, { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Users"), (snapshot) => {
      const fetchedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ❗ Use user.uid instead of id to compare
      const filtered = currentUser
        ? fetchedUsers.filter((user) => user.uid !== currentUser.uid)
        : fetchedUsers;

      setUsers(filtered);
    });

    return unsubscribe;
  }, [currentUser]);

  return (
    <div style={{ width: "250px", padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h4>📇 Users</h4>
      {users.length === 0 ? (
        <p style={{ color: "gray" }}>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.uid || user.id}
            onClick={() => onSelectUser(user)}
            style={{ cursor: "pointer", marginBottom: "12px" }}
          >
            🧑 {user.username || user.email || "Unnamed User"}
          </div>
        ))
      )}
    </div>
  );
}
