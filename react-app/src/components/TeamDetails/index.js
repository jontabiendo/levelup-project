import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteTeamThunk } from '../../store/teams'

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

    console.log(team.members)

    return (
        <div className='team-info-modal'>
            <h1>{name}</h1>
            <div className='team-description-div'>
                <h4>Description:</h4>
                <p>{description}</p>
            </div>
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
            {user.id === team.created_by ? <OpenModalButton modalComponent={<ConfirmTeamDelete team={team} user={user} />} buttonText={"Delete Team"} /> : null}
        </div>
    )
};

export default TeamInfoModal;