import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setScore } from "../features/gameSlice";
import { Navigate } from "react-router-dom";

import Word from "./Word";

export default function(props) {
    const [ buttonsStatus, setButtonsStatus ] = useState(() => {
        let initialButtonsStatus = [{}];
        let wordsSetLength = props.words.all_words.length;
        for(let i = 0; i < wordsSetLength; i++ ){
            initialButtonsStatus[i] = {
                id: i,
                disabled: false
            }
        }
        return initialButtonsStatus;
    });
    const [ goodAnswers, setGoodAnswers ] = useState(0);
    const [ badAnswers, setBadAnswers ] = useState(0);
    const [ userAnswers, setUserAnswers ] = useState([]);
    const [ remainingGoodWords, setRemainingGoodWords ] = useState([]);
    const [ displayCorrectAnswers, setDisplayCorrectAnswers ] = useState(false);
    const [ shouldRedirect, setShouldRedirect ] = useState(false);
    const [ answersChecked, setAnswersChecked ] = useState(false);

    const dispatch = useDispatch();

    const isInitialMount = useRef(true); 

    const countScore = () => {
        const plusPoints = goodAnswers * 2;
        const minusPoints = badAnswers + remainingGoodWords.length;
        const score = plusPoints - minusPoints;
        return score;
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const score = countScore();
            dispatch(setScore(score));
        }
    }, [remainingGoodWords]);


    if(shouldRedirect) {
        return <Navigate to="/scoreboard" />;
    };

    function handleUserAnswerButton(e) {
        const word = e.target.innerText;
        const goodWords = props.words.good_words;
        const buttonId = parseInt(e.target.id);
        
        const newUserAnswers = userAnswers;
        newUserAnswers.push(word);
        setUserAnswers( newUserAnswers );

        const buttonStatusIndex = buttonsStatus.findIndex(
            buttonStatus => buttonStatus.id == buttonId
        )
        
        const newButtonsStatus = buttonsStatus;
        newButtonsStatus[buttonStatusIndex] = {
            id: buttonId,
            disabled: true
        };
        setButtonsStatus(newButtonsStatus);

        if(goodWords.includes(word)) {
            setGoodAnswers(goodAnswers + 1);
        }else {
            setBadAnswers(badAnswers + 1);
        }
    };


    const handleCheckAnswersButton = () => {
        setDisplayCorrectAnswers(true);

        const goodWords = props.words.good_words;
        const newRemainingGoodWords = goodWords.filter(goodWord => !userAnswers.includes(goodWord));
        setRemainingGoodWords(newRemainingGoodWords);
        setAnswersChecked(true);
    }



    return (
        <div className="canvas">
            <h1 className="canvas__h1">{props.words.question}</h1>
            <div className="canvas__div">
            {
            props.words.all_words.map((text, i) => 
                <Word 
                key={text} 
                id={i} 
                text={text}
                goodWords={props.words.good_words}
                userAnswers={userAnswers}
                disabled={buttonsStatus[i]}
                displayCorrectAnswers={displayCorrectAnswers}
                handleUserAnswerButton={handleUserAnswerButton}
                >    
                </Word>)
            }
            </div>
            { !answersChecked ? 
            <button className="canvas__button" onClick={handleCheckAnswersButton}>Check Answers</button> : 
            <button className="canvas__button" onClick={() => setShouldRedirect(true)}>Finish game</button> 
            }
        </div>
    )
};