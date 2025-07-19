import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import WelcomeMessage from './components/WelcomeMessage.jsx';
import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import UserContext from './UserContext';

function App() {
  const [count, setCount] = useState(0);

  const userData = {
    name: 'Fatimah',
    age: 28,
    bio: 'Frontend dev learning React.'
  };

  return (
    <>
      {/* Logo Section */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* App Components */}
      <WelcomeMessage />
      <Header />
      <MainContent />

      {/* Context-driven Component */}
      <UserContext.Provider value={userData}>
        <ProfilePage />
      </UserContext.Provider>

      <Footer />

      {/* Counter / Vite default */}
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
