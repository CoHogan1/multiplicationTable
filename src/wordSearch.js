import './App.css';
import React, { useState } from 'react';


// test data
let wordList = ['one', 'two','three', 'tree', 'seven', 'ask', 'hungry',"bob",'fish','seventeen']

let testArr = [ [],[],[],[],[],[],[],[],[],[] ]

for (let i = 0; i < testArr.length; i++){
    for (let z = 0; z < testArr.length; z++){
        testArr[i][z] = "0"
    }
}

function WordSearch() {

    const clicked = (e) => {
        e.target.classList.toggle('clicked')
        // save e.target.innerhtml to a string, check if string is in word list.
    }



    return (
        <div className="wordSearch">
            <h1>Word Search</h1>

        <div className="wordBox">
            {wordList.map((word, ind) =>
                <p key={ind} className="word">{word}</p>
            )}
        </div>

        <div className="wordSearchBox">

            {testArr.map((val,ind) => val.map((v,i) =>
                <div key={[ind,i]} className="searchLetter"
                    onClick={clicked}
                    >0</div>
             ))}

        </div>


        </div>
    )
}

export default WordSearch;
