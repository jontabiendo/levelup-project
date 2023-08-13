import React from 'react'
import OpenModalButton from '../OpenModalButton'
import CreateListModal from '../CreateListModal'
import CreateTeamModal from '../CreateTeamModal';

import "./CreateButton.css"

const CreateButton = ({ homeRerender, teams }) => {
    return (
        <div className='create-button-modal'>
            <OpenModalButton modalComponent={<CreateListModal homeRerender={homeRerender} teams={teams} />} buttonText="Add List" />
            <OpenModalButton modalComponent={<CreateTeamModal homeRerender={homeRerender} />} buttonText="Add Team" />
        </div>
    )
};

export default CreateButton