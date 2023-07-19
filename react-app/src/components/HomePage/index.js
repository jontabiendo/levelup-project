import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import ListMenu from "../ListMenu";
import ListDisplay from "../ListDisplay";
import TeamList from "../TeamList";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";

import './HomePage.css'
import { setTasksAction } from "../../store/tasks";

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.lists.personal_lists)
    const [currentList, setCurrentList] = useState(Object.values(lists)[0])
    const [reRender, setRerender] = useState(false)

    useEffect(() => {
        dispatch(setTasksAction(currentList.tasks))
    }, [currentList])
    
    const homeRerender = () => {
        setRerender(!reRender)
    }

    if (!user) return null;

    return (
        <div className="home-page-div">
            <ListMenu homeRerender={homeRerender} currentListState={[currentList, setCurrentList]} />

            <ListDisplay onRerender={homeRerender} currentListState={[currentList, setCurrentList]} />
            <div className="right-panels">
                <div className="right-panel-buttons">
                <OpenModalButton modalComponent={<CreateListModal />} buttonText="Create List" />
                    <button onClick={(e) => alert("Feature coming soon")}>Create Team</button>
                </div>
                <TeamList />
            </div>
        </div>
    )
}

export default HomePage;