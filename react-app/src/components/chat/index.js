// import the socket
import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

let socket;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    // use state for controlled form input
    const [chatInput, setChatInput] = useState(""); 
    const user = useSelector(state => state.session.user);
    const teams = useSelector(state => state.teams)
    console.log(user.first_name)

    useEffect(() => {
        // create websocket
        socket = io();

        socket.emit("join", Object.values(teams)[0])

        // socket

        socket.on("connect", () => {
            console.log(socket.id)
        })
        
        // listen for chat events
        socket.on("chat", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
            console.log(messages)
        })
        
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, []);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        // emit a message
        socket.emit("chat", { user: user.first_name, msg: chatInput, room: Object.values(teams)[0].name});
        // clear the input field after the message is sent
        setChatInput("")
        console.log(messages)
    };

    return (
        // include the form in the return statement for the component
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                    />
                <button type="submit">Send</button>
            </form>
        </div>
    )
};

export default Chat;