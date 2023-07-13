import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createListThunk } from "../../store/lists";

import './NewListForm.css'

export const categories = ["Work", "Finance", "Personal", "Chores", "Productivity", "Groceries", "Entertainment"]

const CreateListModal = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("****CONTACTING REDUCER", title, category, description, isPublic)
        const data = await dispatch
        (createListThunk(title, category, description, isPublic))
        if (data) {
            setErrors(data)
        } else {
            closeModal()
        }
    };

    console.log(category, typeof category)

    return (
        <div className="newlist-form-wrapper">
            <h1>Create New List</h1>
            <form className='newlist-form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>Title: 
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>Category: 
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="categories" selected>categories</option>
                        {categories.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label><input type="checkbox" value={isPublic} onChange={(e) => setIsPublic(!isPublic)} />Public</label><span>Setting this to public will allow friends to see this list</span>
                <label>Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
};

export default CreateListModal;