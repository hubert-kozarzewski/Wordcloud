import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../features/userSlice";

export default function() {
    const { name } = useSelector(state => state.user) 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStartGame = (e) => {
        e.preventDefault();
        navigate("/game");

    };

    return (
        <div className="welcome">
            <h1 className="welcome__h1">Wordcloud Game</h1>
            <form className="welcome__form">
                <input className="welcome__input" type="text" placeholder="Enter your name here..." value={name} onChange={e => dispatch(setName(e.target.value))}></input>
                <button className="welcome__form__button" type="submit" onClick={handleStartGame}>PLAY</button>
            </form>
        </div>
    )
};