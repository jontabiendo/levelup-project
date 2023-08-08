import React from 'react'
import OpenModalButton from '../OpenModalButton'
import CreateListModal from '../CreateListModal'
import CreateTeamModal from '../CreateTeamModal';

import "./CreateButton.css"

const CreateButton = ({ homeRerender }) => {
    return (
        <div className='create-button-modal'>
            <OpenModalButton modalComponent={<CreateListModal homeRerender={homeRerender} />} buttonText="Add List" />
            <OpenModalButton modalComponent={<CreateTeamModal homeRerender={homeRerender} />} buttonText="Add Team" />
        </div>
    )
};

export default CreateButton