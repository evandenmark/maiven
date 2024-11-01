import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user } = useAuth0();

  if (!user) return null;

  return (
    <div className="p-4 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserProfile;
