import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import Messages from "./components/Messages";
import axios from 'axios';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user , getAccessTokenSilently} = useAuth0();

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
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fullstack User Management</h1>
          {isAuthenticated ? (
            <div>
              <span className="mr-4">Welcome, {user?.name}</span>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="bg-red-500 p-2 rounded"
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 p-2 rounded"
            >
              Log in
            </button>
          )}
        </header>

        {isAuthenticated ? (
          <div className="flex">
            <Sidebar />
            <div className="flex-grow p-8">
              <Routes>
                <Route path="/users" element={<Users />} />
                {/* <Route path="/messages" element={<Messages />} /> */}
              </Routes>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Please log in to access the admin panel.</p>
          </div>
        )}
      </div>
    </Router>
  );
}
export default App;