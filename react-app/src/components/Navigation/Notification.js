import React, {useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.session.user.requests)
    const [active, setActive] = useState(false)
    const notificationRef = useRef();

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

    const handleSubmit = async (e, response) => {
        e.preventDefault();

        const res = await dispatch()
    };

    const buttonClassName = "notification-dropdown" + (active ? "" : " hidden");

    return (
        <div className='notification-div'>
            <button id='notification-button' onClick={e => setActive(!active)}><i class="fa-solid fa-bell"></i></button>
            <ul className={buttonClassName} ref={notificationRef} >
                {Object.values(notifications).map(notification => (
                    <li key={notification.id}>
                        <p>{notification.sender.first_name} {notification.sender.last_name} has invited you to join {notification.team.name}</p>
                        <button onClick={e => handleSubmit(e, "accept")}><i class="fa-solid fa-check"></i></button>
                        <button onClick={e => handleSubmit(e, "decline")}><i class="fa-solid fa-x"></i></button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notification;