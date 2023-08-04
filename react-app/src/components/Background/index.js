import React, { useRef, useEffect } from 'react'

import './background.css'

import video from "../../assets/compressed-video.mov"

const Background = () => {
    return (
        <>
            <div id='video-overlay' onClick={null}></div>
            <div id='background'>
            <video src={video} autoPlay muted loop />
            </div>
        </>
    )
}

export default Background