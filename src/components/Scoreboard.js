import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function() {
    const { name } = useSelector(state => state.user);
    const { score } = useSelector(state => state.game);
    
    if(name == "") {
        return <Navigate to="/" />
    };

    return (
        <div className="scoreboard">
            <p>Congratulations, {name}!</p>
            <p>Your score:</p>
            <p className="points">{score} points</p>
        </div>
    )
};