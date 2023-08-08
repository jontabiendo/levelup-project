import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTeamThunk } from '../../store/teams';
import { useModal } from '../../context/Modal';


const CreateTeamModal = ({ homeRerender }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();

    const user = useSelector(state => state.session.user)

    const validate = () => {
        const errs = {}

        if (name.length > 50) errs.name = "Name must be less than 50 characters"
        if (description.length > 255) errs.description = "Description must be less than 255 characters"

        return errs
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate());

        if (Object.values(errors).length) return
        else {
            const res = dispatch(createTeamThunk({name, description}, user.id))

            if (res.errors) setErrors(res)
            else {
                closeModal();
                homeRerender();
            }
        }
    }

    return (
        <div className='create-team-modal'>
            <h1>Add Team Details</h1>
            <form onSubmit={handleSubmit}>
                {errors.name && <p className='errors'>{errors.name}</p>}
                <label>Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Team Name' required maxLength={50}/></label>
                {errors.description && <p className='errors'>{errors.description}</p>}
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='What is the purpose of the team?' required maxLength={255}></textarea>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
};

export default CreateTeamModal