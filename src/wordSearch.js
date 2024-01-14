import './App.css';
import React, { useState, useRef } from 'react';

// test data
let wordList = ['one', 'two','three', 'tree', 'seven', 'ask', 'hungry',"bob",'fish','seventeen']

function fillWordSearchArray(words) {
  const rows = 10;
  const cols = 10;

  // Create a 2D array filled with empty strings
  const wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill(''));

  // Iterate through each word and place it in the array
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Generate random starting coordinates
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    // Determine whether to place the word horizontally or vertically
    const horizontal = Math.random() < 0.5;

    // Check if the word fits in the chosen direction
    while (
      (horizontal && col + word.length > cols) ||
      (!horizontal && row + word.length > rows)
    ) {
      // Regenerate starting coordinates if the word doesn't fit
      row = Math.floor(Math.random() * rows);
      col = Math.floor(Math.random() * cols);
    }

    // Place the word in the array
    for (let j = 0; j < word.length; j++) {
      if (horizontal) {
        wordSearchArray[row][col + j] = word[j];
      } else {
        wordSearchArray[row + j][col] = word[j];
      }
    }
  }

  return wordSearchArray;
}

// Example: Creating a word search array with given words
const crosswordGrid = fillWordSearchArray(wordList);

const generateRandomLetter = () => {
    // ASCII values for lowercase letters: 'a' is 97, 'z' is 122
    const randomCharCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    const randomLetter = String.fromCharCode(randomCharCode);
    return randomLetter;
}

for (let i = 0; i < crosswordGrid.length; i++){
    for (let z = 0; z < crosswordGrid[i].length; z++){
        if (crosswordGrid[i][z] === ""){
            crosswordGrid[i][z] = generateRandomLetter();
        }
    }
}

//------------------------------------------------------------------------------

function WordSearch() {
    let [guess, setGuess] = useState('');
    //let [input, setInput] = useState('');
    let [score, setScore] = useState(0);
    //let [indexCheck, setIndexCheck] = useState('');

    let prevInd = useRef('0,0');
    let nextInd = useRef('');


    const clicked = (e) => {
        // this doesnt work yet.....
        e.target.classList.toggle('clicked')
        console.log(prevInd, nextInd, "1");
        // save guess' as a string

        let temp = e.target.id[0] + e.target.id[2] + ","
        if (prevInd.length === 0){ prevInd = temp}
        nextInd = temp;
        if (prevInd[0] === temp[0] || prevInd[1] === temp[1]){
            setGuess(guess += e.target.innerHTML)
        }
        console.log(prevInd, nextInd, "2");
        prevInd = nextInd

        // console.log(e.target.id)
        // console.log(e.target.id[0],e.target.id[2]);
    }

    const guessWord = (e) => {
        console.log("guess, => ", guess );
        // make sure array indexes are different
        // make sure array indexes are clost to eachother.

        // check is guessed word is in word list
        let flag = false;
        for (let i = 0 ; i < wordList.length; i++){
            if (wordList[i] === guess){
                flag = true
                setScore(score+=1)
                break;
                };
        }
        if (flag){
            // mark word found
            //highlight word permanantly
            setGuess(''); // clear guess field
        }

        // clear guess
    }


    return (
        <div className="wordSearch">
            <h1>Word Search</h1>

            <div className="wordBox">
                {wordList.map((word, ind) =>
                    <p key={ind} className="word">{word}</p>
                )}
            </div>

            <div className="guessMenu">
                <p placeholder="guess a word" className="guessBar">{guess}</p>
                <button onClick={guessWord} className="guessButton">Guess</button>
                <p className="score">{score}</p>
            </div>

            <div className="wordSearchBox">
                {crosswordGrid.map((val,ind) => val.map((v,i) =>
                    <div key={[ind,i]}
                        id={`${ind}-${i}`}
                         className="searchLetter"
                         onClick={clicked}
                    >{crosswordGrid[ind][i]}</div>
                 ))}
            </div>
        </div>
    )
}
export default WordSearch;
