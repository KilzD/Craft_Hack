import React from "react"
import Scifi from "../components/Scifi"
import Cyberpunk from "../components/Cyberpunk"
import Fantasy from "./Fantasy";

function ComponentChecker(props) {
    if (props.theme.name === "cyberpunk")
        return (
            <Cyberpunk theme={props.theme}/>
        );
    else if (props.theme.name === "scifi")
        return (
            <Scifi theme={props.theme}/>
        );
    else if (props.theme.name = "fantasy")
        return (
            <div>
                <Fantasy theme={props.theme}/>
            </div>
        );
}

export default ComponentChecker;