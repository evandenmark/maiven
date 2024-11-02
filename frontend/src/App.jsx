import React, { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Messages from "./components/Messages";
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import Menu from './components/Menu';


function App() {
  //gather necessary components from auth0
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // users are a top level state that flows into Menu, Users, and Messages
  const [users, setUsers] = useState([]);

  //when a user logs in, sync all of the auth0 users with the local db
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
    fetchUsers();
  }, [isAuthenticated, getAccessTokenSilently]); // Dependency array to re-run on isAuthenticated change

  // get all users
  const fetchUsers = async () => {
    try {
      // Get token
      const token = await getAccessTokenSilently();
      // Make request with token in Authorization header
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [getAccessTokenSilently])

  const fetchUserCallback = useCallback( () => {
    fetchUsers(); 
  }, [])

  return (
    <>
      {/* Login and logout screen logic */}
      <Stack sx={{
        alignItems: "center",
        justifyContent: "center",
        spacing: 2,
      }}>
        <h1>Maiven User Management</h1>

        {isAuthenticated ? (
          <>
            <Stack sx={{
              alignItems: "center",
              justifyContent: "center",
              spacing: 5,
            }} >
              <span>Welcome, {user?.name}</span>
              <Button
                variant="contained"
                onClick={() => logout()}
              >
                Log out
              </Button>
            </Stack>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => loginWithRedirect()}
          >
            Log in
          </Button>
        )}
      </Stack>

      {/* when the user is authenicated, show the main application
      i.e. the menu toggle, which brings up Users and Messages */}
      {isAuthenticated && (<Menu currentUser={user} users={users} fetchUserCallback={fetchUserCallback}/>)}
    </>
  );
}
export default App;