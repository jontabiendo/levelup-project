import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import ListMenu from "../ListMenu";
import ListDisplay from "../ListDisplay";
import TeamList from "../TeamList";

import './HomePage.css'

const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const currentList = useSelector(state => state.lists.current_list)
    const lists = useSelector(state => state.lists.personal_lists)

    useEffect(() => {

    }, [currentList])

    if (!user) return null;

    return (
        <div className="home-page-div">
            <ListMenu />
            <ListDisplay list={currentList}/>
            <div className="right-panels">
                <button>Create List</button>
                <button>Create Team</button>
                <TeamList />
            </div>
        </div>
    )
}

export default HomePage;