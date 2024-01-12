import './App.css';
import React, { useState } from 'react';

// test data
let wordList = ['one', 'two','three', 'tree', 'seven', 'ask', 'hungry',"bob",'fish','seventeen']

// generate a board with selected words
function generateCrosswordGrid(words) {

  const gridSize = 10;
  const crosswordGrid = [];
  // Generate an empty grid
  for (let i = 0; i < gridSize; i++) {
    const row = new Array(gridSize).fill('');
    crosswordGrid.push(row);
  }
  // Place words in the grid
  for (const word of words) {
    placeWordInGrid(word, crosswordGrid);
  }

  return crosswordGrid;
}


function placeWordInGrid(word, grid) {
  const gridSize = grid.length;
  const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';

  // Randomly choose a starting position
  let startRow = Math.floor(Math.random() * gridSize);
  let startCol = Math.floor(Math.random() * gridSize);

  // Ensure the word fits in the chosen direction
  while (!canPlaceWord(word, startRow, startCol, direction, grid)) {
    startRow = Math.floor(Math.random() * gridSize);
    startCol = Math.floor(Math.random() * gridSize);
  }

  // Place the word in the grid
  for (let i = 0; i < word.length; i++) {
    if (direction === 'horizontal') {
      grid[startRow][startCol + i] = word[i];
    } else {
      grid[startRow + i][startCol] = word[i];
    }
  }
}

function canPlaceWord(word, startRow, startCol, direction, grid) {
  const gridSize = grid.length;

  // Check if the word fits within the grid boundaries
  if (
    (direction === 'horizontal' && startCol + word.length > gridSize) ||
    (direction === 'vertical' && startRow + word.length > gridSize)
  ) {
    return false;
  }

  // Check for collisions with existing letters in the grid
  for (let i = 0; i < word.length; i++) {
    const currentCell =
      direction === 'horizontal'
        ? grid[startRow][startCol + i]
        : grid[startRow + i][startCol];

    if (currentCell !== '' && currentCell !== word[i]) {
      return false;
    }
  }

  return true;
}

const crosswordGrid = generateCrosswordGrid(wordList);

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


    const clicked = (e) => {
        e.target.classList.toggle('clicked')
        // save guess' as a string
        setGuess(guess += e.target.innerHTML)
        // make sure guess keeps a pattern
    }

    const guessWord = (e) => {
        console.log('guess');
        console.log("guess, => ", guess );
        // check is guessed word is in word list
        let flag = false;
        for (let i = 0 ; i < wordList.length; i++){
            if (wordList[i] === guess){
                flag = true
                setScore(score+=1)
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
                    <div key={[ind,i]} className="searchLetter"
                        onClick={clicked}
                        >{crosswordGrid[ind][i]}</div>
                 ))}
            </div>
        </div>
    )
}
export default WordSearch;
