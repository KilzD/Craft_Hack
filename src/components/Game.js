import React from "react"
import "../css/scifi.css"
import $ from "jquery"

function Game(props) {

    return (
        <div className="center">
            <div className="icons">
                {Array.from({length: 8}).map((_, idx) =>
                    <img src={"images/" + props.theme.img + "/icon" + (idx + 1) + ".png"} id={idx} key={"ic" + idx} className="pictures" alt=""></img>)}
            </div>
            <div className="hid">
                <div className="fl">
                </div>
            </div>
        </div>
    )
}

export default Game;