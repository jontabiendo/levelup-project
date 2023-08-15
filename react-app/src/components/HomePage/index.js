import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListMenu from "../ListMenu";
import ListDisplay from "../ListDisplay";
import OpenModalButton from "../OpenModalButton";
import CreateButton from "../CreateButton";

import './HomePage.css'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import img from "../../assets/panda.gif"

const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.lists)
    const teams = useSelector(state => state.teams)
    const [currentList, setCurrentList] = useState(Object.values(lists.personal_lists)[0])
    const [reRender, setRerender] = useState(false)

    useEffect(() => {
        if (!user) return <Redirect to="/login" />
    }, [currentList])
    
    const homeRerender = () => {
        setRerender(!reRender)
    }

    return (
        <div className="home-page-div">
            <ListMenu homeRerender={homeRerender} lists={lists} teams={teams} currentListState={[currentList, setCurrentList]} />

            {currentList ? <ListDisplay onRerender={homeRerender} currentListState={[currentList, setCurrentList]} /> : (
                <div className="empty-list-display-div">
                    <img id="panda" src={img} frameBorder="0" allowFullScreen></img>
                    <p>Nothing to do... <OpenModalButton modalComponent={<CreateButton homeRerender={homeRerender} teams={teams} />} buttonText="Start a new project?" /></p>
                </div>
            )}
        </div>
    )
}

export default HomePage;