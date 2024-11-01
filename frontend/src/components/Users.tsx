import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, styled } from "@mui/material";

type User = {
    id: number;
    auth0Id: string;
    email: string;
    name: string;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ email: "", name: "" });
    const { getAccessTokenSilently } = useAuth0();


    useEffect(() => {


        fetchUsers();
    }, [getAccessTokenSilently]);

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

    // Delete a user
    const deleteUser = async (userId: number) => {
        try {
            const token = await getAccessTokenSilently();

            await axios.delete(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Re-fetch users to update the list after deletion
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <Stack key={user.id} direction="row" spacing={2}>

                        <Item>{user.name}</Item>
                        <Item>{user.email}</Item>
                        <Item>
                            <Button
                            onClick={() => deleteUser(user.id)}>
                                DELETE USER
                            </Button>
                        </Item>
                    </Stack>

                ))}
            </ul>
        </div>
    );

};

export default Users;
