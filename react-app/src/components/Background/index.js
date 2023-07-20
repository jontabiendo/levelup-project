import React, { useRef, useEffect } from 'react'

import './background.css'

import video from "../../assets/compressed-video.mov"

const Background = () => {
    return (
        <>
            <div id='video-overlay' onClick={null}></div>
            <div id='background'>
            {/* <iframe src="https://www.youtube.com/embed/4jxeYfqevl4?autoplay=1&muted=0&loop=1" title="YouTube video player" frameBorder="0" allow="autoplay" allowFullscreen></iframe> */}
            <video src={video} autoPlay muted loop />
            </div>
        </>
    )
}

export default Background