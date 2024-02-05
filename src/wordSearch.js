import './App.css';
import React, { useState } from 'react'; // ueRef

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
    let wordList = ['all','call','fall','ball','tall','small','walk','talk',
    'chalk','baseball','rainfall','sidewalk','cornstalk','your','from']


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
    let num;

    // populate the board with the specified letters.
    const fill = (words, board) => {
        //console.time('start')

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
            num = num ? false: true;

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

        //console.timeEnd('start')
        //console.log(limit);
        return board
    }
    const crosswordGrid = fill(wordList, wordSearchArray);
    //fillRandomLetters();

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
                <button onClick={clearSelection} className="clear">X</button>
                <p className="guessBar">{guess}</p>
                <button onClick={guessWord} className="guessButton">Guess</button>
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
