import React from "react";

function Scrolltext2() {
    return (
        <>
            <div className="video-container" id="scroll-container2">
                <video autoPlay muted loop className="background-video">
                    <source src="/Untitled2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <p id="scroll-text">
                    TREATMENTS TREAMENTS TREAMENTS
                </p>
            </div>
        </>
    );
}


export default Scrolltext2;