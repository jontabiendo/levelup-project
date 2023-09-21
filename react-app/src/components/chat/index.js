import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ChatBox from './chat';

import './chat.css'

let socket;

const Chat = ({ user, teams }) => {
    console.log(teams)
    const [teamRooms, setTeamRooms] = useState({});
    // const [connected, setConnected] = useState(false)
    const [showRooms, setShowRooms] = useState(false);
    const [chatrooms, setChatrooms] = useState({})

    useEffect(() => {
        
        // if (!connected) {
            socket = io();

            socket.on("connect", () => console.log("A user connected"))
    
            socket.emit("online", {user: user.id, teams: Object.keys(teams)})
    
            socket.on("online_res", (data) => setTeamRooms(data))
    
            // setConnected(true)    
        // }
        
        return (() => {
            console.log(teamRooms)
            socket.emit("go_offline", {user: user.id, teams: Object.keys(teams)})
        })
    }, [])

    const openChatBox = (chatId, chatName) => {
        console.log("opening ", chatId, chatName)
        let res = chatrooms
        if (!chatrooms[chatId]) res[chatId] = chatName
        setChatrooms(res)
        console.log(chatrooms)
    };

    const closeChatBox = (chatId) => {
        let res = chatrooms
        delete res[chatId]
        setChatrooms(res)
    };

    return (
        <div id='chat-div'>
            {Object.keys(chatrooms).map(chat => (
                <div onClick={() => closeChatBox(chat)}>{chatrooms[chat]}</div>
            ))}
            <div id="chat-bar-div" >
                {showRooms ? (
                    <div id='team-chats-list'>
                        {Object.values(teams).map(team => (
                            <div className='team-chat-selector' onClick={() => openChatBox(team.id, team.name)}>
                                {team.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div id="team-chats-hidden">
                </div>
                )}
            <button onClick={() => setShowRooms(!showRooms)} id='chat-bar-button'>Chats</button>
            </div>
    </div>
    )
}

export default Chat;