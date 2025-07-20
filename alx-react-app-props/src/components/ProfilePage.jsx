import React from 'react';
import UserDetails from './UserDetails';
import UserInfo from './UserInfo';

const ProfilePage = () => {
   
  return (
    <div>
      <h1>User Profile</h1>
      <UserDetails />
      <UserInfo />
      <p>✨ Refactored with React Context API - No more prop drilling!</p>
    </div>
  );
};

export default ProfilePage;
