import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteTeamThunk, editTeamThunk } from '../../store/teams'

import './TeamDetails.css'
import OpenModalButton from '../OpenModalButton';

const AddMembersModal = ({ team, user }) => {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const handleSubmit = () => {

    }
    return (
        <div className='add-members-modal'>
            <div id='back-button'>
                <OpenModalButton modalComponent={<TeamInfoModal team={team} user={user}/> } buttonText="Back" />
            </div>
            <form onSubmit={handleSubmit}>
                <input id='add-member-input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='search by email' required  />
                <button type='submit'>Add Member</button>
            </form>
        </div>
    )
};

const ConfirmTeamDelete = ({ team, user, homeRerender }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const deleteTeam = async () => {
        const res = await dispatch(deleteTeamThunk(team.id))

        homeRerender()
        closeModal()
    }

    return (
        <div className='confirm-team-delete-div'>
            <p>Are you sure you want to delete {team.name}? </p>
            <p>You can't undo this change</p>
            <button onClick={deleteTeam}>Yes, delete</button>
            <OpenModalButton modalComponent={<TeamInfoModal team={team} user={user}/> } buttonText="No don't delete" />
        </div>
    )
};

const TeamInfoModal = ({ team, user, homeRerender }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description);    
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(editTeamThunk({name, description}, team.id))

        if (res) setErrors(res);
        else return
    };
    console.log(errors)

    return (
        <div className='team-info-modal'>
            {user.id !== team.created_by ? (
            <>
                <h1>{name}</h1>
                <div className='team-description-div'>
                    <h4>Description:</h4>
                    <p>{description}</p>
                </div>
            </>
            ) : (
            <form onSubmit={handleSubmit}>
                {errors.name && <p className='errors'>{errors.name}</p>}
                <div className='edit-team-header'>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} required placeholder='Team title here' ></input>
                    <button type='submit'>Save</button>

                </div>
                <div className='team-description-div'>
                    {errors.description && <p className='errors'>{errors.description}</p>}
                    <label>Description:</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder='Team description'></textarea>
                </div>
            </form>
            )}
            <div className='team-members-div'>
                <div className='team-member-header-wrapper'>
                    <h4>Members: </h4>
                    {user.id === team.created_by ? (<OpenModalButton modalComponent={<AddMembersModal team={team} user={user} />} buttonText={"Add Members"} />) : null}
                </div>
                <ul className='members-list-ul'>
                    {Object.values(team.members).map(member => (
                        <li key={member.id}>
                            <p>{member.first_name} {member.last_name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {user.id === team.created_by ? <OpenModalButton modalComponent={<ConfirmTeamDelete team={team} user={user} homeRerender={homeRerender}/>} buttonText={"Delete Team"} /> : null}
        </div>
    )
};

export default TeamInfoModal;