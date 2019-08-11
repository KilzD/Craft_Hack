import React from "react"
import "../css/fantasy.css"


function Fantasy(props) {

    return (
        <div className="center">
            <div className="pol">
                <div className="images">
                    <img src="images/fantasy/Science.png" alt=""/>
                    <div className="element"></div>
                </div>
            </div>

            <div className="pol2">
                {Array.from({length: props.theme.imgCount}).map((_, idx) =>
                    <img src={"images/" + props.theme.img + "/icon" + (idx + 1) + ".png"} id={idx}
                         key={"ic" + idx} className="pictures" alt=""></img>)}
            </div>
        </div>
    )
}

export default Fantasy;