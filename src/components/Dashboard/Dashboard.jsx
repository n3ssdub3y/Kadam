import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../cloudinary';
import './Dashboard.css';
import Navbar from './Navbar';
import Feed from './Feed';
import Sidebar from './Sidebar';
import NGOProfile from './NGOProfile'
import UserProfile from './UserProfile'
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
        <div className="left-sidebar">
          {ngoId && <NGOProfile />}
          {userId && <UserProfile />}
        </div>


        {/* Main Feed */}
          <Feed></Feed>

        {/* Right Sidebar */}
         <Sidebar></Sidebar>   
        
        </div>
    </div>
  );
};

export default Dashboard;