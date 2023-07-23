import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createListThunk } from "../../store/lists";
import CreateListModal from "../CreateListModal";
import ListDisplay from "../ListDisplay";
// import { setCurrentList } from "../../store/lists";

import './ListMenu.css'
import DeleteListModal from "../ListDisplay/deleteListModal";
import { setTasksAction } from "../../store/lists";

const ListMenu = ({ homeRerender, currentListState }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.personal_lists)
    const [currentList, setCurrentList] = currentListState

    useEffect(() => {
        // dispatch(setTasksAction(currentList.tasks))
    }, [lists, currentList])

    return (
        <>
        <div className="list-menu-div">
            <div className="list-menu-header">
                <h3>My Lists</h3>
                <OpenModalButton modalComponent={<CreateListModal />} buttonText="+" />
            </div>
            <ul id="current-lists-ul">
                {Object.values(lists).map(list => (
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
            </ul>
        </div>
        </>
    )
}

export default ListMenu;