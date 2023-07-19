import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeamList = ({ teams }) => {

    console.log(teams)
    return (
        <div className="team-list-menu">
            <h3>Team List</h3>
            {Object.values(teams).map(team => (
                <p>{team.name}</p>
            ))}
        </div>
    )
};

export default TeamList