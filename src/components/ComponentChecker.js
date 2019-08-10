import React from "react"
import Scifi from "../components/Scifi"
import Cyberpunk from "../components/Cyberpunk"

function ComponentChecker(props){
    if (props.theme.name === "cyberpunk")
        return(
            <Cyberpunk theme = {props.theme}/>
        );
    else if (props.theme.name === "scifi")
        return (
            <Scifi theme = {props.theme}/>
        );
}

export default ComponentChecker;