import React from 'react';
import { useUser } from '../contexts/UserContext';

const UserInfo = () => {
  // Step 4: Clean up - no more userData props needed
  const userData = useUser();

  return (
    <div>
      <h2>User Information</h2>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserInfo;
