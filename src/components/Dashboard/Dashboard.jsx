import React from 'react';
import NGOProfile from './NGOProfile';
import UserProfile from './UserProfile';

function Dashboard() {
  const ngoId  = localStorage.getItem('ngoId');
  const userId = localStorage.getItem('userId');

  return (
    <>
      {ngoId && <NGOProfile />}
      {userId && <UserProfile />}
    </>
  );
}

export default Dashboard;
