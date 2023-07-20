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
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = {}
        
        if (description.length > 50) {
            errs.description = "Description can't be over 50 characters"
        }
        if (category.length === 0) {
            errs.category = "Please select a category for your list"
        }
        setErrors(errs)
        if (Object.values(errs).length) return null
        else {
            const data = await dispatch
            (createListThunk(title, category, description, isPublic))
            if (data) {
                setErrors(data)
            } else {
                closeModal()
            }
        }
    };
    
    return (
        <div className="newlist-form-wrapper">
            <h1>Create New List</h1>
            <form className='newlist-form' onSubmit={handleSubmit}>
                {errors.description && <p className="errors">{errors.description}</p>}
                <label>Title: 
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                {errors.category && <p className="errors">{errors.category}</p>}
                <label>Category: 
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="" selected>categories</option>
                        {categories.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label><input type="checkbox" value={isPublic} onChange={(e) => setIsPublic(!isPublic)} />Public</label>
                <label>Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
};

export default CreateListModal;