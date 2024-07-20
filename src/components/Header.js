import React from "react";
import {ReactComponent as Icon} from "../images/page-icon.svg";

export default function Header() {
    return(
        <div className="header">
            <Icon className="icon"/>
            <p className="page-title">Meme Generator</p>
        </div>
    );
}