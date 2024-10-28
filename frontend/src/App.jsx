import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div>
      <h1>Fullstack User Management</h1>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}</p>
          <p>This is where the messaging system goes</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
}

export default App;