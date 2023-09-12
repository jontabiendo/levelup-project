import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ChatBox from './chat';

import './chat.css'

let socket;

const Chat = ({ user, teams }) => {
    const [teamRooms, setTeamRooms] = useState({});
    const [showRooms, setShowRooms] = useState(false)

    useEffect(() => {
        socket = io();

        socket.on("connect", () => console.log("A user connected"))

        socket.emit("online", {user: user.id, teams: Object.keys(teams)})

        socket.on("online_res", (data) => setTeamRooms(data))

        return (() => {
            socket.emit("go_offline", {user: user.id, teams: teamRooms})
        })
    }, [teamRooms])

    return (
        <div id="chat-bar-div" >
           {showRooms ? (
            <div id='team-chats-list'>
                {Object.values(teams).map(team => (
                    <div className='team-chat-selector'>
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
    )
}

export default Chat;