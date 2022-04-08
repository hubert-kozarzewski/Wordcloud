import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import GameCanvas from "./GameCanvas";

export default function() {
    const { name } = useSelector(state => state.user);
    const { wordsSets } = useSelector(state => state.game);

    function initialChosenWordsList() {
        const randomSetNumber = Math.floor(Math.random() * wordsSets.length);
        const chosenSet = wordsSets[randomSetNumber];
        return chosenSet;
    };

    const [ chosenWordsList, setChosenWordsList ] = useState(initialChosenWordsList());

    if(name == "") {
        return <Navigate to="/" />
    };
    
    return (
        <div>
            {chosenWordsList && <GameCanvas words={chosenWordsList} />}
        </div>
    )
};