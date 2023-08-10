import React, {useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { respondInviteThunk } from '../../store/teams';

const Notification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.session.user.requests)
    const [active, setActive] = useState(false)
    const notificationRef = useRef();
    const [errors, setErrors] = useState({})

    const openMenu = () => {
        if (active) return;
        setActive(true)
    };

    useEffect(() => {
        if (!active) return;

        const closeMenu = (e) => {
            if (!notificationRef.current.contains(e.target)) {
                setActive(false);
            }
        };

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [active]);

    const handleSubmit = async (e, response, request) => {
        e.preventDefault();

        const res = await dispatch(respondInviteThunk(response, request))

        if (res) setErrors(res)
        else {
            setActive(false)
            
        }
    };

    const buttonClassName = "notification-dropdown" + (active ? "" : " hidden");

    return (
        <div className='notification-div'>
            <button id='notification-button' onClick={openMenu}><i class="fa-solid fa-bell"></i></button>
            <ul className={buttonClassName} ref={notificationRef} >
                {Object.values(notifications).length ? Object.values(notifications).map(notification => (
                    <li key={notification.id}>
                        <p>{notification.sender.first_name} {notification.sender.last_name} has invited you to join {notification.team.name}</p>
                        <button onClick={e => handleSubmit(e, "accept", notification)}><i class="fa-solid fa-check"></i></button>
                        <button onClick={e => handleSubmit(e, "decline", notification)}><i class="fa-solid fa-x"></i></button>
                    </li>
                )): <p>You have no new requests</p>}
            </ul>
        </div>
    )
}

export default Notification;