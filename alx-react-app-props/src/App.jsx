import React from 'react';
import ProfilePage from './components/ProfilePage';
import { UserProvider } from './contexts/UserContext';

function App() {
  // Sample user data
  const userData = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    joinDate: 'January 2022'
  };

  return (
    <div>
      {/* Step 2: Wrap ProfilePage in UserContext.Provider and pass userData as value */}
      <UserProvider userData={userData}>
        <ProfilePage />
      </UserProvider>
    </div>
  );
}

export default App;