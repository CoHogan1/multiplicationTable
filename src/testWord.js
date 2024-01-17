import './App.css';
import React, { useState, useRef } from 'react';


function Test(){
    const rows = 10;
    const cols = 10;

    const wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));
    let wordList = ['one', 'two','three', 'tree', 'seven', 'ask', 'hungry',"bob",'fish','seventeen']

    const populateWordArray = (words) => {

        for (let i = 0 ; i < words.length; i++){
            let word = words[i]

            // pick a random index
            let row = Math.floor(Math.random() * rows)
            let col = Math.floor(Math.random() * cols)

            // pick a direction
            const horizontal = Math.random() < 0.5;

            // Check if the word fits in the chosen direction
            while ( (horizontal && col + word.length > cols) ||
                   (!horizontal && row + word.length > rows) ) {
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

    const newArray = populateWordArray(wordList)


    const generateRandomNum = () => {
        let num = Math.floor(Math.random() * (11 - 0) + 0);
        return num
    }








    return(
        <div className="test" style={{color: 'white'}}>
            {newArray.map((val,ind) => val.map((v,i) =>
            <div className="temp">{val[i]}</div>))}
        </div>
    )
}
export default Test;
