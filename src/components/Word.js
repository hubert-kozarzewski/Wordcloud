import React from "react";
import { useState } from "react";

export default function(props) {
    const { id, text, goodWords, userAnswers, disabled, displayCorrectAnswers, handleUserAnswerButton } = props;
    const [ answerText, setAnswerText ] = useState(() => {
        if(goodWords.includes(text)) {
            return "Good";
        }else {
            return "Bad";
        }
    });

    return (
        <div>
            {displayCorrectAnswers && userAnswers.includes(text) && 
            <div
            className={`${answerText == "Good" ? "check_good" : "check_bad"}`}>{answerText}
            </div>}
            <button
            className="answer"
            id={id}
            onClick={handleUserAnswerButton}
            disabled={disabled.disabled}
            >
            {text}
            </button>
        </div>
    )
};