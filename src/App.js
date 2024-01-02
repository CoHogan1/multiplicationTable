
import './App.css';
import React, { useState } from 'react';

let tables = [1,2,3,4,5,6,7,8,9]

function App() {
    let [selectedTable, setSelectedtable] = useState(0);
    let [secondNumber, setSecondNumber] = useState(0);
    let [input, setInput] = useState('');
    let [score, setScore] = useState(0);
    let [guess, setGuess] = useState(0);


    // set first number to practice multiplicaiton on
    const select = (e) => {
        console.log("select");
        setSelectedtable(e.target.innerHTML)
        e.target.className="selected";
        // set second number
        getNum()
    }

    // generate random number2 to practice
    const getNum = () => {
        let num = Math.floor(Math.random() * (9 - selectedTable) + selectedTable);
        setSecondNumber(num);
        console.log(num, " setting sec num");
    }

    const handleChange = (e) => {
        setInput(e.target.value)
        setGuess(parseInt(e.target.value))
    }

    const check = (e) => {
        console.log("check");
        let value = selectedTable * secondNumber
        console.log(value, "value", guess, "guess");

        if (guess === value){
            console.log("true");
            setScore(score+=1)
            setInput(input = '');
        } else {
            console.log("false");
            // clear input
        }
    }


  return (
    <div className="App">
        <div>{selectedTable}, {secondNumber}, {guess}</div>

        <div className="table-type">
            {tables.map((a,b) => <div
                className="table-number"
                onClick={select}
                key={b}>{a}
                </div>)}
        </div>

        <div className="equation">
            <div>{selectedTable || 1}</div>
            <div>X</div>
            <div>{secondNumber}</div>
            <div> = </div>
            <input placeholder="answer" value={input} onChange={handleChange}></input>
            <button type="submit"
                onClick={check}
                placeholder="Answer"
                >Answer</button>
        </div>

        <div>Correct: {score}</div>

    </div>
  );
}

export default App;
