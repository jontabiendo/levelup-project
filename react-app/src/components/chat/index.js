// import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Chat from './chat';

const ChatUsers = ({ user, teams, socket }) => {
    const [users, setUsers] = useState({});
    const [showUsers, setShowUsers] = useState(false)
    console.log(users)

    useEffect(() => {
        // socket = io();

        socket.on("connect", () => console.log("HERE", socket.id))

        socket.emit("online", {user: user.first_name, socketID: socket.id})

        socket.on("online_res", (data) => setUsers(data))
        console.log(users)

        return (() => {
            socket.emit("go_offline", socket.id)
        })
    }, [socket])
    console.log(users)

    const divName = "chat-bar-div" + (showUsers ? "" : "-hidden")
    return (
        <div id={divName} onClick={() => setShowUsers(!showUsers)}>
           <button id='chat-bar-button'>Chats</button>
           {showUsers ? (
            <div id='online-users-list'>
                {Object.values(users).map(user => (
                    <div className='online-user-div'>
                        {user}
                    </div>
                ))}
            </div>
           ) : null}
        </div>
    )
}

export default ChatUsers