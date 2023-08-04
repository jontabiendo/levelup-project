import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteListThunk } from "../../store/lists";

import "./ListDisplay.css"
import img from "../../assets/naruto-run.gif"

const DeleteListModal = ({ list, homeRerender }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [deleted, setDeleted] = useState(false)
    
    const handleDelete = async (e) => {
        const data = await dispatch(deleteListThunk(list.id));

        setDeleted(true)

        setTimeout(closeModal, 3000)

        homeRerender()
    };

    return (
        <>
            {!deleted ? (
            <div className={"delete-modal-div"}>
                <h2>Are you sure you want to remove your list {list.title}?</h2>
                <button onClick={handleDelete}>Yes, remove this list</button>
                <button onClick={closeModal}>No, keep this list</button>
            </div>) : (
                <>
                <div className="delete-modal-div">
                    <iframe  id='deleting-gif' src="https://giphy.com/embed/TZco470UACpNK" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    <h3>Deleting to do list...</h3>
                </div>
                </>
            )}
        </>
    )
};

export default DeleteListModal;