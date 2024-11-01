import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Messages from "./components/Messages";
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import Menu from './components/Menu';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          // Call the sync user endpoint
          await axios.post('/users/sync', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently]); // Dependency array to re-run on isAuthenticated change


  return (
    <Router>
      <div>
        <header>
          <Stack sx={{
            alignItems: "center",
            justifyContent: "center",
            spacing: 2,
          }}>
            <h1>Maiven User Management</h1>
            {isAuthenticated ? (
              <Stack sx={{
                alignItems: "center",
                justifyContent: "center",
                spacing: 5,
              }} >
                <span className="mr-4">Welcome, {user?.name}</span>
                <Button
                  variant="contained"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log out
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </Button>
            )}
          </Stack>
        </header>

        {isAuthenticated && (
          <>
            <Menu currentUser={user}/>
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/messages" element={<Messages currentUser={user} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}
export default App;