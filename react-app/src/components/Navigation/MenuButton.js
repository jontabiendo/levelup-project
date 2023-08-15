import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MenuButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
    setShowMenu(false)
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button id='menu-button' onClick={openMenu}>
      <i className="fa-solid fa-bars fa-2xl"></i>
      </button>
      <ul ref={ulRef}>
        {user ? (
          <div className={ulClassName}>
            <li>Hello, {user.first_name}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className={ulClassName}>
            <button onClick={() => {
              history.push('/login')
              setShowMenu(false)
              }} className="nav-button">Log In</button>

            <button onClick={() => {
              history.push('/signup')
              setShowMenu(false)
              }} className="nav-button">Sign Up</button>
          </div>
        )}
      </ul>
    </div>
  );
}

export default MenuButton;
