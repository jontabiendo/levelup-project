    import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import ListMenu from "../ListMenu";
import ListDisplay from "../ListDisplay";
import TeamList from "../TeamList";
import OpenModalButton from "../OpenModalButton";
// import CreateListModal from "../CreateListModal";
import CreateButton from "../CreateButton";
// import OpenModalButton from "../OpenModalButton";

import './HomePage.css'
import { setTasksAction } from "../../store/lists";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import img from "../../assets/panda.gif"

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const lists = useSelector(state => state.lists)
    const teams = useSelector(state => state.teams)
    const [currentList, setCurrentList] = useState(Object.values(lists.personal_lists)[0])
    const [reRender, setRerender] = useState(false)

    useEffect(() => {
        // dispatch(setTasksAction(currentList.tasks))
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
                    <p>Nothing to do... <OpenModalButton modalComponent={<CreateButton homeRerender={homeRerender} teams={teams} />} buttonText="Make a new one?" /></p>
                </div>
            )}
            {/* <div className="right-panels">
                <div className="right-panel-buttons">
                    <OpenModalButton modalComponent={<CreateListModal />} buttonText="Create List" />
                    <button onClick={(e) => alert("Feature coming soon")}>Create Team</button>
                </div>
                <TeamList teams={teams} toggleLists={changeListView} />
            </div> */}
        </div>
    )
}

export default HomePage;