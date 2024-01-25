import './App.css';
import React, { useState } from 'react';

// images
import pickaxe from './backgrounds/nPickaxeE.webp';
//import ice from './backgrounds/iceBiome.webp';
import desert from './backgrounds/dessert.png';
//import bad from './backgrounds/badLands.png';

let tables = [1,2,3,4,5,6,7,8,9,10,11,12];
//let imgs = [desert, bad];
// let index = Math.floor(Math.random() * imgs.length);
// console.log(index);

let imgs = [desert]



function Multiply() {
    let [selectedTable, setSelectedtable] = useState(1);
    let [secondNumber, setSecondNumber] = useState(0);
    let [ansList, setAnsList] = useState([]);
    let [input, setInput] = useState('');
    let [guess, setGuess] = useState(0);
    let [score, setScore] = useState(0);
    let [wrong, setWrong] = useState(0);

    // set first number to practice multiplicaiton on
    const select = (e) => {
        //console.log("select");
        setSelectedtable(e.target.innerHTML)
        // select parent element
        let parent = e.target.parentElement
        // loop through parent element's children and set all classes
        for (let i = 0; i < parent.children.length; i++){
            parent.children[i].className = "table-number"
        }
        // change color or selsected class
        e.target.className = "selected";
        // set second number
        getNum()
    }

    // generate random number2 to practice
    const getNum = () => {
        let num = Math.floor(Math.random() * (13 - 1) + 1);
        setSecondNumber(num);
        //console.log(num, " setting sec num");
    }

    // set anser "guess" in state
    const handleChange = (e) => {
        setInput(e.target.value)
        setGuess(parseInt(e.target.value))
    }

    // check math
    const check = (e) => {
        // add 5 second delay
        //console.log("check");
        let value = selectedTable * secondNumber
        //console.log(value, "value", guess, "guess");

        if (guess === value){
            //console.log("true");
            setScore(score+=1)
            setInput(input = '');
            getNum();
            //console.log([parseInt(selectedTable),"X",secondNumber, "=",guess]);
            ansList.push([parseInt(selectedTable),"X",secondNumber, "=",guess])
            setAnsList(ansList)
        } else {
            setInput(input = '');
            setWrong(wrong+=1)
        }
    }

  return (
    <div className="App">
    <div className="second" style={{ backgroundImage: `url(${imgs[0]})`}}>
        <div className="table-type">
            {tables.map((a,b) => <div
                className="table-number"
                onClick={select}
                key={b}>{a}
                </div>)}
        </div>

        <div className="equation">
            <div>{selectedTable}</div>
            <div>X</div>
            <div>{secondNumber}</div>
            <div> = </div>
            <input placeholder="quick maths"
                type="number"
                value={input}
                name="answer"
                onChange={handleChange}>
            </input>
            <img className="submit" alt="pickaxe" src={pickaxe}
                onClick={check}>
            </img>
        </div>

        <div className="scores">
            <div >Yes:  {score}</div>
            <div >Not yes:  {wrong}</div>
        </div>

        <div className="answerList">
            {ansList.map((a,b) => <div key={b} className="listItem">{a} :)</div>)}

        </div>
    </div>
    </div>
  );
}

export default Multiply;
