
import './App.css';
// import React from 'react';
import React, { useState } from 'react';
import Multiply from './multiply.js';
import WordSearch from './wordSearch.js';
import LilianaMath from './liliMath.js'
import Test from './testWord.js'


function App() {
    let [index, setIndex] = useState(1);

    let viewArray = [<Multiply />, <WordSearch />, <LilianaMath />]

    const changeTheIndex = (e) => {
        setIndex(e.target.id)
    }
    // change the background of the view tab to be invisible.

  return (
    <div className="Main" >
        <Test />


    </div>
  );
}
export default App;




// <div className="navigation">
//     <div onClick={changeTheIndex} id="0">Isaac Math</div>
//     <div onClick={changeTheIndex} id="1">Word Search</div>
//     <div onClick={changeTheIndex} id="2">Liliana's Takeaways</div>
// </div>
// <div>{viewArray[index]}</div>
