import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the JWT token
        const token = await getAccessTokenSilently();

        // Make the request with the Authorization header
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data); // Do something with the user data
        } else {
          console.error("Failed to fetch user data: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return <div>User profile information will be logged in console</div>;
};

export default UserProfile;
