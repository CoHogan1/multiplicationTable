import './App.css';
import React, { useState, useRef } from 'react';

// test data
let rows = 10, cols = 10;
const wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));

let limit = 0

//------------------------------------------------------------------------------

function WordSearch() {
    let [guess, setGuess] = useState('');
    //let [input, setInput] = useState('');
    let [score, setScore] = useState(0);
    //let [indexCheck, setIndexCheck] = useState('');
    let prevInd = useRef('0,0');
    let nextInd = useRef('');
    let wordList = ['one', 'two','three', 'tree', 'seven', 'ask', 'hungry',
        "bob",'fish','seventeen']

    const generateRandomLetter = () => {
        // ASCII values for lowercase letters: 'a' is 97, 'z' is 122
        const randomCharCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
        const randomLetter = String.fromCharCode(randomCharCode);
        return randomLetter;
    }

    const generateIndex = () => {
        let num = Math.floor(Math.random() * (8 - 1) + 1);
        return num
    }

    const fillRandomLetters = () => {
        // fill the non word spaces in the array with a letter
        for (let i = 0; i < crosswordGrid.length; i++){
            for (let z = 0; z < crosswordGrid[i].length; z++){
                if (crosswordGrid[i][z] === "_"){
                    crosswordGrid[i][z] = generateRandomLetter();
                }
            }
        }
    }

    // populate the board with the specified letters.
    const fill = (words, board) => {
        console.time('start')

        while(words.length > -1){
            //console.table(board);
            limit++
            if (limit > 2000) break;
            let word = words[words.length -1]
            if (words.length === 0) break;

            // pick a random index
            let x = generateIndex()
            let y = generateIndex()

            // pick a direction, horizontal or vertical
            let num = Math.floor(Math.random() > 0.5)

            let availableLen = 10 - y;
            let availableUp = 10 - x;

            // check if there is room at current index for both directions
            if (word.length > availableLen & word.length > availableUp){ continue }
            // one of these are true, whiche one.

            let up = true, over = true;
            if (word.length > availableLen) over = false;
            if (word.length > availableUp) up = false;


            // check to see if there is available room for word, and check to see if no words exist in index
            let lenFlag = true, heightFlag = true;
            if (!word){ break };
            for (let l = 0; l < word.length; l++){
                if (over){
                    // to right
                    if (board[x][y + l] !== "_"){ lenFlag = false }
                }
                if (up){
                    // verticle down
                    if (board[x + l][y] !== '_'){ heightFlag = false }
                }
            }

            // check if there is room for a word in both directions
            if (lenFlag === false && heightFlag === false){ continue }


            if (word.length > availableLen) continue;
            // num == true => horizontal
            if (num && lenFlag){
                // if there is room in the array
                if (availableLen >= word.length){
                    // fill the word into the array.
                    for (let g = 0; g < word.length; g++){
                        board[x][y + g] = word[g];
                    }
                }
                words.pop()
            }
            if (words.length === 0) break;

            if (word.length > availableUp) continue;
            // num == false => vert
            if (!num && heightFlag){
                // if there is room in the array
                if (availableLen >= word.length){
                    // fill the word into the array.
                    for (let g = 0; g < word.length; g++){
                        board[x+g][y] = word[g];
                    }
                }
                words.pop()
            }

        }

        console.timeEnd('start')
        //console.log(limit);
        return board
    }
    const crosswordGrid = fill(wordList, wordSearchArray);
    fillRandomLetters();


    const clicked = (e) => {
        // this doesnt work yet.....
        e.target.classList.toggle('clicked')
        //console.log(prevInd, nextInd, "1");
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
        <div className="bg">
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
        </div>
    )
}
export default WordSearch;
