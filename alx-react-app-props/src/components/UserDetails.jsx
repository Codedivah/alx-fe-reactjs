import React from 'react';
import { useUser } from '../contexts/UserContext';

const UserDetails = () => {
  
  const userData = useUser();

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
      <p>Location: {userData.location}</p>
      <p>Join Date: {userData.joinDate}</p>
    </div>
  );
};

export default UserDetails;
