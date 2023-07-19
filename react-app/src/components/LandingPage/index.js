import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import ListMenu from "../ListMenu";
import ListDisplay from "../ListDisplay";
import TeamList from "../TeamList";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import './landingPage.css'
import img from '../../assets/pngegg (1).png'

const LandingPage = () => {
    const history = useHistory();
    const [start, setStart] = useState(false)
    const [newGame, setNewGame] = useState(false)
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