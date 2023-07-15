import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { createListThunk } from "../../store/lists";
import CreateListModal from "../CreateListModal";
import ListDisplay from "../ListDisplay";
// import { setCurrentList } from "../../store/lists";

import './ListMenu.css'

const ListMenu = ({ onRerender, currentListState }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.personal_lists)
    const [currentList, setCurrentList] = currentListState

    useEffect(() => {}, [lists])

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
                        {/* <ListDisplay list={list} onRerender={forceRerender} /> */}
                        <button onClick={(e) => {
                            // dispatch(setCurrentList(list)) 
                            setCurrentList(list)}}>{list.title}</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default ListMenu;