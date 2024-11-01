import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

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
        <Paper sx={{padding: 5}} elevation={0}>
            <h2>Users</h2>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Delete User?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        onClick={() => deleteUser(user.id)}
                                        sx={{ background: "red" }}>
                                        DELETE USER
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );

};

export default Users;
