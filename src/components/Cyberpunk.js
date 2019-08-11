import React from "react"
import $ from "jquery"

function Cyberpunk(props) {

    return (
        <div className="main_site_page">
            <div className="icons">
                {Array.from({length: props.theme.imgCount}).map((_, idx) =>
                    <img src={"images/" + props.theme.img + "/icon" + (idx + 1) + ".png"} id={idx} key={"ic" + idx} className="pictures" alt=""></img>)}
            </div>
            <div className="hid">
                <div className="fl">
                </div>
            </div>
        </div>
    )
}

export default Cyberpunk;