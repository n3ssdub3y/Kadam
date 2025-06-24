import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css';
import NGOProfile from './NGOProfile'
import UserProfile from './UserProfile'
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Feed from './Feed'
import './Dashboard.css'

const Dashboard = () => {
  const ngoId  = localStorage.getItem('ngoId');
  const userId = localStorage.getItem('userId');

  return (
    <div className="Kadam-container">
      {/* Header */}
      <Navbar></Navbar>

      {/* Main Content */}
      <div className="Kadam-content">
        {/* Left Sidebar */}
      {ngoId && <NGOProfile />}
      {userId && <UserProfile />}


        {/* Main Feed */}
          <Feed></Feed>

        {/* Right Sidebar */}
          <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default Dashboard;