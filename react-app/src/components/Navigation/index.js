import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuButton from './MenuButton';
import Notification from './Notification';

import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<div className='home-icon-div'>
				<NavLink exact to="/"><h1>LevelUp</h1></NavLink>
			</div>
			{isLoaded && (
				<div id='menu-button-div'>
					{sessionUser ? <Notification /> : null}
					<MenuButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;