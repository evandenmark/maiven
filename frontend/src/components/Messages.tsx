import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, Button, Paper, Stack, styled, TextField } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "../types";

type Message = {
    id: number;
    sender: string;
    receiver: string;
    content: string;
    createdAt: string;
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

const Messages = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const { getAccessTokenSilently } = useAuth0();

    const [messageRecipient, setMessageRecipient] = useState<User>();
    const [messageBody, setMessageBody] = useState<string>("");


    useEffect(() => {
        fetchMessages();
    }, [getAccessTokenSilently])

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

            console.log("RESPONSE: ", response)

            // Assuming response.data contains the messages
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
            console.log("RESPONSE USER:", response)
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const sendMessage = () => {
        console.log("SENDING THE MESSAGE")
    }

    return (
        <>
            <h2> Messages</h2>

            <Autocomplete
                disablePortal
                options={users.map(u => u.email)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Users" />}
                onChange={(e,v) => setSelectedUser(v)}
            />


            {messages.filter((x) => !selectedUser || x.receiver == selectedUser?.email || x.sender == selectedUser?.email)
                .map((message) => {
                    return (
                        <Stack key={message.id} direction="row" spacing={2}>
                            <Item>{message.createdAt}</Item>
                            <Item>{message.sender}</Item>
                            <Item>{message.receiver}</Item>
                            <Item>{message.content}</Item>
                        </Stack>)

                })}


            <h3>Send Message</h3>
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
            />
            <Button
                onClick={() => sendMessage()}>
                Send
            </Button>
        </>
    )


}

export default Messages;
