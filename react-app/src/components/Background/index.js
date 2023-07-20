import React, { useRef, useEffect } from 'react'

import './background.css'

const Background = () => {
    return (
        <>
            <div id='video-overlay' onClick={null}></div>
            <div id='background'>
            <iframe src="https://www.youtube.com/embed/4jxeYfqevl4?autoplay=1" title="YouTube video player" frameborder="0" allow="autoplay" allowfullscreen></iframe>
            </div>
        </>
    )
}

export default Background