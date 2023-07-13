import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";

import './ListMenu.css'
import { createListThunk } from "../../store/lists";
import CreateListModal from "../CreateListModal";

const ListMenu = () => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.personal_lists)

    const createList = () => {
        dispatch(createListThunk())
    }

    return (
        <div className="list-menu-div">
            <div className="list-menu-header">
                <h3>My Lists</h3>
                <OpenModalButton modalComponent={<CreateListModal />} buttonText="+" />
            </div>
            <ul id="current-lists-ul">
                {Object.values(lists).map(list => (
                    <li key={list.id}>
                        {list.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListMenu;