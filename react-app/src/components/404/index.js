import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import "./errorPage.css"

const ErrorPage = () => {
    const user = useSelector(state => state.session.user)

    useEffect(() => {

    }, [])

    return (
        <div className='error-page'>
            <h2>Oops! Something went wrong</h2>
            <iframe src="https://giphy.com/embed/ugBFdBl61vMk3aTyhB" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            {user ? <Link to='/lists'>Back to home</Link> : <Link to='/'>Back to home</Link>}
        </div>
    )
};

export default ErrorPage