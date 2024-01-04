
import './App.css';
import React, { useState } from 'react';

let tables = [1,2,3,4,5,6,7,8,9]

function App() {
    let [selectedTable, setSelectedtable] = useState(0);
    let [secondNumber, setSecondNumber] = useState(0);
    let [ansList, setAnsList] = useState([]);
    let [input, setInput] = useState('');
    let [guess, setGuess] = useState(0);
    let [score, setScore] = useState(0);
    let [wrong, setWrong] = useState(0);




    // set first number to practice multiplicaiton on
    const select = (e) => {
        console.log("select");
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
        let num = Math.floor(Math.random() * (9 - selectedTable) + selectedTable);
        setSecondNumber(num);
        console.log(num, " setting sec num");
    }

    // set anser "guess" in state
    const handleChange = (e) => {
        setInput(e.target.value)
        setGuess(parseInt(e.target.value))
    }

    // check math
    const check = (e) => {
        // add 5 second delay
        console.log("check");
        let value = selectedTable * secondNumber
        console.log(value, "value", guess, "guess");

        if (guess === value){
            console.log("true");
            setScore(score+=1)
            setInput(input = '');
            getNum();
            //console.log([parseInt(selectedTable),"X",secondNumber, "=",guess]);
            ansList.push([parseInt(selectedTable),"X",secondNumber, "=",guess])
            setAnsList(ansList)
        } else {
            console.log("false");
            setInput(input = '');
            setWrong(wrong+=1)
        }
    }


  return (
    <div className="App">
        <div>debug: {selectedTable}, {secondNumber}, {guess}</div>

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
            <input placeholder="answer" value={input} onChange={handleChange}></input>
            <button type="submit"
                onClick={check}
                placeholder="Answer"
                >Answer</button>
        </div>

        <div className="scores">
            <div style={{color: "green"}}>Correct:{score}</div>
            <div style={{color: "red"}}>Wrong:{wrong}</div>
        </div>

        <div className="answerList">
            {ansList.map((a,b) => <div key={b} className="listItem">{a} :)</div>)}
             {/* add correct answer data here */}
        </div>

    </div>
  );
}

export default App;
