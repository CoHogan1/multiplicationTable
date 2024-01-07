
import './App.css';
import React, { useState } from 'react';

// images
import image1 from "./backgrounds/bg1.gif";
import image2 from "./backgrounds/christmas.gif";
import image3 from "./backgrounds/christmas2.gif";
import image4 from "./backgrounds/gumball.gif";
import image5 from "./backgrounds/minecraftFox.gif";
import image6 from "./backgrounds/minesOfMoria.gif";
import image7 from "./backgrounds/minesOfMoria2.gif";
import image8 from "./backgrounds/space.gif";
import image9  from "./backgrounds/ttd1.gif";
import image10 from "./backgrounds/ttd2.gif";


let tables = [1,2,3,4,5,6,7,8,9];
let imgs = [ image1, image2, image3, image4, image5, image6, image7,
    image8, image9, image10];

function App() {
    let [selectedTable, setSelectedtable] = useState(0);
    let [secondNumber, setSecondNumber] = useState(0);
    let [ansList, setAnsList] = useState([]);
    let [input, setInput] = useState('');
    let [guess, setGuess] = useState(0);
    let [score, setScore] = useState(0);
    let [wrong, setWrong] = useState(0);
    let [index, setIndex] = useState(0);




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
        let num = Math.floor(Math.random() * (9 - 1) + 1);
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

    // change index to change backround image
    const next = (e) => {
        console.log(index, imgs.length);
        let temp = index +1
        if (temp >= imgs.length){ temp = 0}
        setIndex(temp)
    }

    const backgroundImageStyle = {
        backgroundImage: `url(${imgs[index]})`,
        backgroundSize: 'cover'
    }

  return (
    <div className="App" style={backgroundImageStyle}>
        {/*}<div>debug: {selectedTable}, {secondNumber}, {guess}</div>*/}
        <div className="next" onClick={next}>Background</div>

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
            <input placeholder="quick maths" value={input} onChange={handleChange}></input>
            <button type="submit"
                onClick={check}
                placeholder="Answer"
                >Answer</button>
        </div>

        <div className="scores">
            <div style={{color: "green"}}>Yes:  {score}</div>
            <div style={{color: "red"}}>Not yes:  {wrong}</div>
        </div>

        <div className="answerList">
            {ansList.map((a,b) => <div key={b} className="listItem">{a} :)</div>)}
             {/* add correct answer data here */}
        </div>

    </div>
  );
}

export default App;
