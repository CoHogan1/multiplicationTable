import './App.css';
import React, { useState } from 'react'; // ueRef

// test data
let rows = 12, cols = 12;
const wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));
let temporary = Array.from({ length: rows }, () => Array(cols).fill(' '))

let limit = 0

//------------------------------------------------------------------------------

function WordSearch() {
    let [guess, setGuess] = useState('');
    //let [input, setInput] = useState('');
    let [score, setScore] = useState(0);
    let [wordArray, setWordArray] = useState(temporary);
    //let [indexCheck, setIndexCheck] = useState('');
    let wordList = ['all','call','fall','ball','tall','small','walk','talk',
    'chalk','baseball','rainfall','sidewalk','cornstalk','your','from']

    // helper functions for main crossword population function.
    const generateRandomLetter = () => {
        // ASCII values for lowercase letters: 'a' is 97, 'z' is 122
        const randomCharCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
        const randomLetter = String.fromCharCode(randomCharCode);
        return randomLetter;
    }
    const generateIndexX = (word) => {
        let num = Math.floor(Math.random() * (12 - 1) + 1);
        return num
    }

    const generateIndexY = (word) => {
        let num = Math.floor(Math.random() * (12 - 1) + 1);
        return num
    }

    const fillRandomLetters = (grid) => {
        console.log("filling random letters");
        // fill the non word spaces in the array with a letter
        for (let i = 0; i < grid.length; i++){
            for (let z = 0; z < grid.length; z++){
                if (grid[i][z] === "_"){
                    grid[i][z] = generateRandomLetter();
                }
            }
        }
        console.log("done");
        return grid;
    }
    // check is there is space in the 2d array
    const availableSpaceRow = (word, x, y, arr) => {
        let ans = true;
        // check to make sure word fits in array
        if (word.length > rows -y){
            ans = false
            return;
        }
        for (let i = 0; i < word.length; i++){
            if (arr[x][y+i] !== "_"){
                ans = false;
                break
            }
        }
        return ans
    }
    // check if there is space in 2d array going down
    const availableSpaceCol = (word, x, y, arr) => {
        let ans = true;
        // check to make sure word fits in array
        if (word.length > cols - x){
            ans = false
            return
        }
        for (let i = 0; i < word.length; i++){
            if (arr[x+i][y] !== "_"){
                ans = false;
                break;
            }
        }
        return ans
    }

    //place the word in previous checked spaces-row
    const placeWordRow = (word, x, y, arr) => {
        for (let g = 0; g < word.length; g++){
            arr[x][y + g] = word[g];
        }
        return arr;
    }
    // place previously checked word in spces-column
    const placeWordCol = (word, x, y, arr) => {
        for (let g = 0; g < word.length; g++){
            arr[x + g][y] = word[g];
        }
        return arr;
    }

    // populate the board with the specified letters.
    const fill = (words, board, wLeft) => {
        let direction;
        console.time('start')

        while(words.length > 0){
            //console.table(board);
            if (limit > 500) break;
            let word = words[words.length -1]
            if (words.length === 0) break;

            // // pick a random index
            let x = generateIndexX(word)
            let y = generateIndexY(word)

            if (board[x][y] !== "_") continue;

            // pick a direction, horizontal or vertical
            direction = direction ? false: true;

            let availableRow = board.length - y;
            let availableCol = board.length - x;

            // check if there is room at current index for both directions
            let col = word.length <= availableCol;
            let row = word.length <= availableRow;

            // no room for either directions
            if (col === false && row === false){ continue }

            // check to see if there is available room for word
            // check there isnt a letter in that place already
            if (wordList.length <= 0) break;
            let lengthFlag, heightFlag;

            if (col) {lengthFlag = availableSpaceRow(word, x, y, wordSearchArray)};
            if (row) {heightFlag = availableSpaceCol(word, x, y, wordSearchArray)};

            // check if there is room for a word in both directions
            if (lengthFlag === false && heightFlag === false){
                continue
             }
             limit++

            // just checking
            if (word.length > availableRow) continue;

            // place word verticlally
            if (direction && lengthFlag){
                // if there is room in the array
                if (availableRow >= word.length){
                    placeWordRow(word, x, y, wordSearchArray);
                    wordList.pop()
                }
            }

            // place a word vertically
            if (!direction && heightFlag){
                // if there is room in the array
                if (availableCol >= word.length){
                    placeWordCol(word, x, y, wordSearchArray);
                    wordList.pop()
                }
            }

        }
        console.timeEnd('start')
        console.log(wordList.length, "rest of words left");
        wLeft = words.length;
        return board
    }

    const genBoard = () => {
        console.log("fill");
        let wordsLeft = 0;
        const temp = fill(wordList, wordSearchArray, wordsLeft);
        fillRandomLetters(temp);
        setWordArray(temp);
        console.log(wordsLeft);
    }


    //const crosswordGrid = temp;
    //const crosswordGrid = fill(wordList, wordSearchArray);
    //fillRandomLetters(crosswordGrid);

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    let [longShot, setLongShot] = useState([]); // wouldnt work otherwise
    let [values, setValues] = useState([]);


    const clicked = (e) => {
        if (e.target.className === "searchLetter clicked"){
            // remove last val of value array, and last letter of guess
            console.log("not in list");
            let arr = [...values]
            arr.pop();
            setValues(arr);
            setGuess(guess.replace(/.$/,''))
            e.target.classList.toggle('clicked')
            let edited = longShot.slice(0, -1);
            setLongShot(edited)
            return;
        }
        // change the class so the item is highlighted
        e.target.classList.toggle('clicked')
        // lol idk
        let val = e.target
        longShot.push(val)
        // save guess' index as a string
        let temp = e.target.id[0] + e.target.id[2]
        // save indexs to a var to be checked for validity
        let arr = [...values]
        arr.push(temp);
        setValues(arr);
        // console.log(e.target.id[0],e.target.id[2]);
        setGuess(guess += e.target.innerHTML)
    }

    // set all classes of the elements in array to a class.
    // const setClasses = (arr, nameClass) => {
    //     for (let i = 0; i < arr.length; i++){
    //         arr[i].classList.toggle(nameClass)
    //     }
    // }

    const highlightWord = (arr) => {
        for (let i = 0; i < arr.length; i++){
            arr[i].classList.toggle('correct');
        }
        return;
    }

    const clearClasses = (arr) => {
        // change classes of the word back to normal classes
        for (let i = 0; i < arr.length; i++){
            arr[i].classList.replace('clicked', 'searchLetter');
        }
        longShot = []
        return;
    }

    const scratchWordOut = (word) => {
        let val = document.querySelector('.wordBox')
        let nodes = val.childNodes
        for (let i = 0 ; i < nodes.length; i++){
            if (nodes[i].innerHTML === word){
                nodes[i].classList.toggle('new')
            }
        }
        return;
    }

    const guessWord = (e) => {
        // see if the word is in the word array
        if (!wordList.includes(guess)){
            console.log("word not in list");
            clearClasses(longShot);
            setLongShot([]);
            setGuess('');
            setValues([]);
        }
        // check for corrrect index placement of words
        let row = true;
        let row2 = true;
        let plumb = true;
        let plumb2 = true;

        // check indexes to ensure the selected elements are in a row.
        for (let i = 0; i < values.length -1; i++){
            let temp = values[i].split('');
            let nextTemp = values[i+1].split('');
            if (temp[0] !== nextTemp[0]){
                row = false;
                }
            if (parseInt(temp[1]) !==(nextTemp[1] -1)) {
                row2 = false;
            }
        }

        for (let j = 0; j < values.length -1; j++){
            let first = values[j].split('');
            let second = values[j+1].split('');
            let val = second[0] -1

            if (first[0] !== `${val}`){
                plumb = false;
            }

            if (first[1] !== second[1]){
                plumb2 = false;
            }

        }

        //console.log(plumb, plumb2, "plumb");
        // console.log(row, row2,'row');
        if (row && row2){
            let plusScore = score +1
            highlightWord(longShot);
            setLongShot([]);
            setScore(plusScore);
            scratchWordOut(guess);
            setGuess('')
            setValues([]);
        }

        if (plumb && plumb2){
            let plusScore = score +1
            highlightWord(longShot)
            setLongShot([]);
            scratchWordOut(guess);
            setGuess('')
            setScore(plusScore)
            setValues([]);
        }
        if (score >= wordList.length){
            console.log("reload game is won");
            window.location.reload(false);
        }
        clearClasses(longShot);
        setLongShot([]);
        setGuess('');
        setValues([]);
        // check if all words are found.
    }

    const clearSelection = () => {
        clearClasses(longShot)
        setGuess('')
        setValues([]);
        setLongShot([]);
    }


    return (
        <div className="wordSearch">


        <div className="bg">
            <div className="spacer"></div>
            <div className="wordBox">
                {wordList.map((word, ind) =>
                    <p key={ind} className="word">{word}</p>
                )}
            </div>

            <div className="guessMenu">
                <button className="fill" onClick={genBoard}>Fill</button>
                <button onClick={clearSelection} className="clear">X</button>
                <p className="guessBar">{guess}</p>
                <button onClick={guessWord} className="guessButton">&#10004;</button>
            </div>

            <div className="wordSearchBox">
                {wordArray.map((val,ind) => val.map((v,i) =>
                    <div key={[ind,i]}
                        id={`${ind}-${i}`}
                         className="searchLetter"
                         onClick={clicked}
                    >{wordArray[ind][i]}</div>
                 ))}
            </div>

        </div>
        </div>
    )
}
export default WordSearch;
