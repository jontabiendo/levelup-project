import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import './landingPage.css'
import img from '../../assets/pngegg.png'

const LandingPage = ({ user }) => {
    const history = useHistory();
    const [start, setStart] = useState(false)
    const [newGame, setNewGame] = useState(false)

    // if (user) return <Redirect to="/lists" />
    return (
        <div className="landing-page-div">
            <h1>Welcome to LevelUp!</h1>
            <div className="landing-button-div">
                {start && <img className="hover-img" src={img} />}
                <h3 onMouseEnter={() => setStart(true)} onMouseLeave={() => setStart(false)} onClick={() => history.push('/login')} className="nav-button">Log In</h3>
            </div>
            <div className="landing-button-div">
                {newGame && <img className="hover-img" src={img} />}
                <h3 onMouseEnter={() => setNewGame(true)} onMouseLeave={() => setNewGame(false)} onClick={() => history.push('/signup')} className="nav-button">Sign Up</h3>
            </div>
        </div>
    )
};

export default LandingPage;