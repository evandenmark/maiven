import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, Button, Paper, Stack, styled, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types";

type Message = {
    id: number;
    sender: string;
    receiver: string;
    content: string;
    createdAt: string;
};


const Messages = ({ currentUser }) => {

    const { getAccessTokenSilently } = useAuth0();

    // state used for displaying messages of users
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserEmail, setSelectedUserEmail] = useState<string>();

    // state used for message sending
    const [messageRecipient, setMessageRecipient] = useState<User>();
    const [messageBody, setMessageBody] = useState<string>("");

    // get messages after any login change
    useEffect(() => {
        fetchMessages();
    }, [getAccessTokenSilently])

    // get messages from db
    // if no user is provided, get all messages
    const fetchMessages = async (userId?) => {
        try {
            // Get token
            const token = await getAccessTokenSilently();

            // Prepare the request URL
            const url = userId ? `${import.meta.env.VITE_API_URL}/messages?userId=${userId}` : `${import.meta.env.VITE_API_URL}/messages`;

            // Make request with token in Authorization header
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            // set the local state for messages to display in table 
            setMessages(response.data.map((m) => {
                return {
                    id: m.id,
                    content: m.content,
                    sender: m.sender?.email ?? "no email specified",
                    receiver: m.receiver?.email ?? "no email specified",
                    createdAt: m.timestamp

                }
            }));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

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

    // there are users on Auth0 and users on our local db
    // they SHOULD be constantly synced
    // here, in order to properly set the message, we need to get the local id of an auth0 user
    const fetchCurrentUserByAuth0Id = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await axios.get(`/users/auth0/${currentUser.sub}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching user by Auth0 ID:", error);
            throw error;
        }
    };

    // post request to put a message in the db
    const sendMessage = async (recipient: User, message: string) => {
        const senderUser = await fetchCurrentUserByAuth0Id();

        try {
            const token = await getAccessTokenSilently();
            const response = await axios.post(
                'http://localhost:3000/messages',
                {
                    content: message,
                    senderId: senderUser.id,
                    receiverId: recipient.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchMessages()
            return response.data; // Return the response if needed
        } catch (error) {
            console.error("Error creating message:", error);
            throw error;
        }
    }

    // we only want to view messages of users we select OR if no user is selected, show all
    const filteredMessages = messages.filter((x) => !selectedUserEmail || x.receiver === selectedUserEmail || x.sender === selectedUserEmail)

    return (
        <>
            {/* Sending a message UI  */}
            <Paper
                elevation={1}
                sx={{
                    padding: 5
                }}
            >
                <h2>Send Message</h2>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Autocomplete
                            disablePortal
                            options={users}
                            getOptionLabel={o => o.email}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Users" />}
                            onChange={(e, v) => setMessageRecipient(v)}
                        />
                        <TextField
                            label="Message"
                            multiline
                            variant="filled"
                            onChange={(e) => setMessageBody(e.target.value)}
                            rows={4}
                            sx={{width: '50%'}}
                        />

                    </Stack>
                    <Button
                        variant="contained"
                        sx={{ width: 50 }}
                        onClick={() => {
                            if (messageRecipient) {
                                sendMessage(messageRecipient, messageBody ?? "blank message")
                            }
                        }}>
                        Send
                    </Button>
                </Stack>

            </Paper>

            {/* Message Searching */}
            <Paper sx={{ padding: 5 }}>
                <h2> Messages</h2>
                <Autocomplete
                    disablePortal
                    options={users.map(u => u.email)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Users" />}
                    onChange={(e, v) => setSelectedUserEmail(v)}
                />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>To: </TableCell>
                                <TableCell>From: </TableCell>
                                <TableCell>Message </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMessages.map((message) => (
                                <TableRow
                                    key={message.id}
                                >
                                    <TableCell>{message.createdAt}</TableCell>
                                    <TableCell>{message.sender}</TableCell>
                                    <TableCell>{message.receiver}</TableCell>
                                    <TableCell>{message.content}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )


}

export default Messages;
