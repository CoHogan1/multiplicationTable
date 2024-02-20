
let rows = 12, cols = 12;
let wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));

let limit = 0

let wordList = ['all','call','fall','ball','tall','small','walk','talk',
'chalk','baseball','rainfall','sidewalk','cornstalk','your','from']
//let wordList = ['one', 'two', 'three','four','five','six', 'seven', 'eight',
//'nine', 'ten', 'eleven', 'twelve', 'thireteen', 'fourteen', 'fifteen']

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
const fill = (words, board) => {
    let direction;
    console.time('start')

    while(words.length > 0){
        //console.table(board);
        if (limit > 200) break;
        let word = words[words.length -1]
        if (words.length === 0) break;

        // // pick a random index
        let x = generateIndexX(word)
        let y = generateIndexY(word)


        if (board[x][y] !== "_"){
            // works perfectly
            continue
         }

        // pick a direction, horizontal or vertical
        direction = direction ? false: true;

        let availableRow = board.length - y;
        let availableCol = board.length - x;

        // check if there is room at current index for both directions
        let col = word.length <= availableCol;
        let row = word.length <= availableRow;

        //console.log(word.length, availableRow, availableCol, " this ");
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


        if (word.length > availableRow){
            //console.log('wordlength > space in row');
             continue; // shouldnt need this
         }

        // place word verticlally
        if (direction && lengthFlag){
            // if there is room in the array
            if (availableRow >= word.length){
                placeWordRow(word, x, y, wordSearchArray);
                wordList.pop()
                //console.log(" word removed");
                //console.table(wordSearchArray);
            }
        }

        // place a word vertically
        if (!direction && heightFlag){
            // if there is room in the array
            if (availableCol >= word.length){
                placeWordCol(word, x, y, wordSearchArray);
                wordList.pop()
                //console.log('word removed');
                //console.table(wordSearchArray)
            }
        }

    }

    console.timeEnd('start')
    console.log(wordList.length, "words left");
    //console.log(limit);
    return board
}
const crosswordGrid = fill(wordList, wordSearchArray);
//fillRandomLetters();
console.table(crosswordGrid);
console.log(limit, "here is the limit");



// for (let i = 0 ; i < wordList.length; i++){
//     let word = wordList[wordList.length -1]

    // pick an indes that has room
    // find an indes in 2d array
    // place word

//}
