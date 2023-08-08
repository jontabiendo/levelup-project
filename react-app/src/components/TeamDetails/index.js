import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

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
}

const TeamInfoModal = ({ team, user }) => {
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
        </div>
    )
};

export default TeamInfoModal;