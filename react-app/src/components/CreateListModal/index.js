import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createListThunk } from "../../store/lists";

import './NewListForm.css'

export const categories = ["Work", "Finance", "Personal", "Chores", "Productivity", "Groceries", "Entertainment"]

const CreateListModal = ({homeRerender, teams}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [isPublic, setIsPublic] = useState(false)
    const [team, setTeam] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = {}
        
        if (description.length > 50) {
            errs.description = "Description can't be over 50 characters"
        };
        if (category.length === 0) {
            errs.category = "Please select a category for your list"
        };
        if (title.length > 50) {
            errs.title = "Title can't be over 50 characters"
        };

        setErrors(errs)
        if (Object.values(errs).length) return null
        else {
            const data = await dispatch
            (createListThunk(title, category, description, isPublic, team))
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
                {errors.title && <p className="errors">{errors.title}</p>}
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
                <div className="team-select-div">
                    <label>Team: 
                        <select onChange={(e) => setTeam(e.target.value)} >
                            <option value="" selected>none</option>
                            {Object.values(teams).map(team => (
                                <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                        </select></label>
                </div>
                <label>Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
};

export default CreateListModal;