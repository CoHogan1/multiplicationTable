let rows = 12, cols = 12;
let wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));

let limit = 0

let wordList = ['all','call','fall','ball','tall','small','walk','talk',
'chalk','baseball','rainfall','sidewalk','cornstalk','your','from']

console.table(wordSearchArray);

const checkRow = (board, index, word) => {
    // needs testing
    let space = board.length - word.length;
    if (space < word.length) return false;
    let flag = true;
    for (let i = index[1]; i < board.length; i++){
        if (board[index[0][i]] !== "_") flag = false;
    }
    return flag;
}

const checkCol = (board, index, word) => {
    // needs testing
    let space = board.length - word.length;
    if (space < word.length) return false;
    let flag = true;
    for (let i = index[0]; i < board.length; i++){
        if (board[index[i][1]] !== "_") flag = false;
    }
    return flag;
}



const findeIndexRow = (arr, wurd) => {
    for (let a = 0; a < arr.length; a++){
        for(let b = 0; b < arr.length; b++){
            // skip some indexes to spread out words
            if (Math.random() > 0.5) continue;
            // if index is occupied, skip iteration
            if (arr[a][b] !== "_"){ continue }
            let rowClear = checkRow(arr, `${a}${b}`, wurd);
            if (!rowClear) continue;
            return `${a}${b}`
        }
    }
    return false;
}

const findeIndexCol = (arr, wurd) => {
    for (let a = 0; a < arr.length; a++){
        for(let b = 0; b < arr.length; b++){
            // skip some indexes to spread out words
            if (Math.random() > 0.5) continue;
            // if index is occupied, skip iteration
            if (arr[a][b] !== "_"){ continue }
            let colClear = checkCol(arr, `${a}${b}`, wurd);
            if (!colClear) continue;
            return `${a}${b}`
        }
    }
    return false;
}




const populate = (board, words) => {

    for (let i = 0; i < words.length; i++){
        let word = words[i];

        // find an index
        let column = findeIndexCol(board, word);
        let row = findeIndexRow(board,word);
        // let x = string[0];
        // let y = string[1];

        // place word



    }
    console.log(column, row);

}


console.table(populate(wordSearchArray, wordList))
