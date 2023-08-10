import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";

import './ListMenu.css'
import DeleteListModal from "../ListDisplay/deleteListModal";
import { setLists } from "../../store/lists";
import TeamInfoModal from "../TeamDetails";
import CreateButton from "../CreateButton";

const ListMenu = ({ homeRerender, currentListState, teams, lists }) => {
    const dispatch = useDispatch()
    const listsState = useSelector(state => state.lists)
    
    const [currentList, setCurrentList] = currentListState
    const [teamLists, setTeamLists] = useState(lists.team_lists)
    const [personalLists, setPersonalLists] = useState(lists.personal_lists)
    const [currentLists, setCurrentLists] = useState(personalLists)
    const [currentTeams, setCurrentTeams] = useState(teams)
    const [currentTeam, setCurrentTeam] = useState(null)
    const user = useSelector(state => state.session.user)

    
    useEffect(() => {
        setPersonalLists(listsState.personal_lists)
        setTeamLists(listsState.team_lists)
        setCurrentLists(listsState.personal_lists)
        setCurrentTeams(teams)
    }, [listsState, currentList, teams])
    
    return (
        <>
        <div className="list-menu-div">
            <div className="list-menu-header">
                <button className={currentLists === personalLists ? "active" : ""} onClick={() => setCurrentLists(personalLists)}><h3>My Lists</h3></button>
                <button className={currentLists === teamLists ? "active" : ""} onClick={() => setCurrentLists(teamLists)}><h3>My Teams</h3></button>
                <OpenModalButton modalComponent={<CreateButton homeRerender={homeRerender} />} buttonText="+" />
            </div>
            {currentLists === personalLists ? (<ul id="current-lists-ul">
                {Object.values(personalLists).map(list => (
                    <li key={list.id}>
                        <div className="li-div">
                            {currentList.id === list.id ? (<button className={"active"} onClick={(e) => {
                                setCurrentList(list)}}>{list.title}
                            </button>) : (<button onClick={(e) => {
                                setCurrentList(list)}}>{list.title}
                            </button>)}
                            <OpenModalButton modalComponent={<DeleteListModal list={list} homeRerender={homeRerender}/>} buttonText={<i className="fa-solid fa-trash"></i>} />
                        </div>
                    </li>
                ))}
            </ul>) 
            : 
            (
                <div id="team-lists-div">
                    {Object.values(teams).map(team => (
                        <div className="team-list-div">
                                <div>
                                <button className={currentTeam &&(currentTeam.id === team.id) ? "active" : ""}>{team.name}</button>
                                <OpenModalButton modalComponent={<TeamInfoModal team={team} user={user} homeRerender={homeRerender} />} buttonText={<i className="fa-solid fa-info"></i>} />
                                </div>
                                <ul className="team-lists-div">
                                    {Object.values(team.lists).map(list => (
                                        <li key={list.id}>
                                        <div className="li-div">
                                            {currentList.id === list.id ? (<button className={"active"} onClick={(e) => {
                                            setCurrentList(list)}}>{list.title}
                                            </button>) : (<button onClick={(e) => {
                                            setCurrentList(list)}}>{list.title}
                                            </button>)}
                                            {team.created_by === user.id || list.user_id === user.id ? (<OpenModalButton modalComponent={<DeleteListModal list={list} homeRerender={homeRerender}/>} buttonText={<i className="fa-solid fa-trash"></i>} />) : null}
                                        </div>
                                    </li>
                                    ))}
                                    </ul>
                            </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}

export default ListMenu;