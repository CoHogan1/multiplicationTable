import './App.css';
import React, { useState } from 'react';

import img1 from './backgrounds/flowers.gif'
import img2 from './backgrounds/landscape.gif'
import img3 from './backgrounds/purpleFlower.gif'



function LilianaMath(){
    let [first, setFirst] = useState(1);
    let [second, setSecond] = useState(1);
    let [answer, setAnswer] = useState('');
    let [right, setRight] = useState(0);
    let [wrong, setWrong] = useState(0);
    let [index, setIndex] = useState(0);
    let imgs = [img1, img2, img3];

    const generateRandomNumber = () => {
        // generate a random single digit number to practice subtraction
        let num = Math.floor(Math.random() * (10 - 1) + 1);
        return num;
    }

    const generateNewEquation = () => {
        let big = generateRandomNumber();
        let sml = generateRandomNumber();
        if (big >= sml){
            setFirst(big)
            setSecond(sml)
            return;
        }
        setFirst(sml)
        setSecond(big)
    }

    const checkAnswer = () => {
        console.log(first, second, answer, " equation");
        if (first - second === parseInt(answer)){
            console.log("correct");
            generateNewEquation();
            setRight(right+=1)
            setAnswer('')
        } else {
            console.log("incorect");
            setWrong(wrong+=1)
        }
    }

    const handleChange = (e) => {
        setAnswer(e.target.value);
        console.log(e.target.value);
    }


    // change index to change backround image
    const next = (e) => {
        let temp = index +1
        if (temp >= imgs.length){ temp = 0}
        setIndex(temp)
    }

    const backgroundImageStyle = {
        backgroundImage: `url(${imgs[index]})`,
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
    }

    return(
        <div className="liliMath" style={backgroundImageStyle}>
            <h2 onClick={next}>Liliana's Math Practice</h2>

            <div className="subtraction">
                <div>{first}</div>
                <p> - </p>
                <div>{second}</div>
                 <p> = </p>
                 <input onChange={handleChange} type="number"
                     placeholder="guess here" value={answer}/>
                 <button onClick={checkAnswer}>Check</button>
            </div>

            <div className="scoresLiliana">
                <div style={{color: "green"}}>Yes:  {right}</div>
                <div style={{color: "red"}}>Not yes:  {wrong}</div>
            </div>


        </div>
    )
}

export default LilianaMath;
