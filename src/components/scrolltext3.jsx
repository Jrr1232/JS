import React from "react";

function Scrolltext3() {
    return (
        <>
            <div className="video-container" id="scroll-container3">
                <video autoPlay muted loop className="background-video">
                    <source src="/Untitled.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <p id="scroll-text">
                    HAIRCUTS HAIRCUTS HAIRCUTS HAIRCUTS
                </p>
            </div>
        </>
    );
}


export default Scrolltext3;