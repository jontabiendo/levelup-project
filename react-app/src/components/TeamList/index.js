import React from "react";

const TeamList = ({ teams, toggleLists }) => {
    return (
        <div className="team-list-menu">
            <h3>Teams</h3>
            {Object.values(teams).map(team => (
                <p onClick={toggleLists} className="team-selector">{team.name}</p>
            ))}
        </div>
    )
};

export default TeamList