import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chat from './chat';

let socket;

const ChatUsers = ({ user, teams }) => {
    const [teamRooms, setTeamRooms] = useState({});
    const [showRooms, setShowRooms] = useState(false)
    console.log(teamRooms)

    useEffect(() => {
        socket = io();

        socket.on("connect", () => console.log("HERE", socket.id))

        socket.emit("online", {user: user.first_name, teams: Object.keys(teams)})

        socket.on("online_res", (data) => setTeamRooms(data))
        console.log(teamRooms)

        return (() => {
            socket.emit("go_offline", socket.id)
        })
    }, [socket])
    console.log(teamRooms)

    const divName = "chat-bar-div" + (showRooms ? "" : "-hidden")
    return (
        <div id={divName} >
           <button onClick={() => setShowRooms(!showRooms)} id='chat-bar-button'>Chats</button>
           {showRooms ? (
            <div id='online-users-list'>
                {Object.values(teams).map(team => (
                    <div className='online-user-div'>
                        {team.name}
                    </div>
                ))}
            </div>
           ) : null}
        </div>
    )
}

export default ChatUsers