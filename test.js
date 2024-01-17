const generateRandomNum = () => {
    //let num = Math.floor(Math.random() * (11 - 0) + 0);
    let num = Math.floor(Math.random() > 0.5)
    return num // favors  > 0.5
}

let memo = {}

for (let i = 0; i < 10000; i++){
    let number = generateRandomNum();
    if (memo[number]){
        memo[number]++
    } else {
        memo[number] = 1;
    }
}
//console.log(memo);

let rows = 10, cols = 10;
const wordSearchArray = Array.from({ length: rows }, () => Array(cols).fill('_'));
let wordList = ['aaa','bbb','cccc','ddddd','eeee','fff','gggg','hhhhhhhhh'];


const generateIndex = () => {
    let num = Math.floor(Math.random() * (8 - 1) + 1);
    return num
}


let limit = 0


const fill = (words, board) => {
    console.time('start')

    while(words.length > -1){
        console.table(board);
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
    console.log(limit);
    return board
}





console.table(fill(wordList, wordSearchArray));










//console.table(wordSearchArray);
let count = 0
const fillBoard = (arr, list) => {
    console.time('start')
    while (list.length > -1){
        count++
        if(count > 2000){ break };
    //     let word = list[list.length -1]
    //     //console.log(word, " word ");
    //     if (word === undefined) break;

        //let i = 0, z = 0;


        for (let i = 0; i < list.length; i++){
            let word = list[list.length - 1]
            for (let z = 0; z < arr[i].length; z++){
                // if space is , "occupied, go to next index
                if(arr[i][z] !== "_") { continue }

                //dont check every index, spread it out a bit to space the words
                if (Math.random() > 0.3){ continue }

                //chose vert or horizontal direction to place word
                let num = Math.floor(Math.random() > 0.5)

                // length of the index to the end of the array
                let availableLen = 9 - z;
                let availableHeight = 9 - i;

                //
                let word = wordList[wordList.length -1]

                // check to see if there is available room for
                let lenFlag = true, heightFlag = true, upFlag = true;
                if (!word){ break };
                for (let l = 0; l < word.length; l++){
                    // to right
                    if (arr[i][z + l] !== "_"){ lenFlag = false }
                    // verticle down
                    if (arr[i + l][z] !== '_'){ heightFlag = false }
                }

                // if no room break loop and check next index
                if (lenFlag === false && heightFlag === false){ break }

                // horizontal word fill
                if (num && lenFlag){
                    // if there is room in the array
                    if (availableLen >= word.length){
                        // fill the word into the array.
                        for (let g = 0; g < word.length; g++){
                            arr[i][z + g] = word[g];
                        }
                    }
                    list.pop()
                }

                //places the word, doesnt skip

                // vertical wordfill
                if(!num && heightFlag){
                    if (availableHeight >= word.length){
                        for (let h = 0; h < word.length; h++){
                            arr[i + h][z] = word[h];
                        }
                    }
                    list.pop()
                }

            }
        }

    }

    console.timeEnd('start')
    console.log(count);
    return arr
}

//console.table(fillBoard(wordSearchArray, wordList))






// while (wordList.length > 0){
    // let word = wordList[wordList.length -1]

    // loop through the array and find an index
    // pick a direction, vertical or horizontal

    // if horizontal
    //     check if the word will fit in the array
    //       check to see if every index is clear

    // if vert
    //     check if the word wil fit in the array
    //     check to see if every index is clear

    //if it wont fit restart next iteration

    //if it will fit, and indexs are clear

    //loop throught the word and place in array - vert and horizontal

    // move to next word.









    // for (let i = 0; i < arr.length; i++){
    //     for(let z = 0; z < arr[i].length; z++){
    //
    //     }
    // }

//}






// for (let i = 0; i < arr.length; i++){
//
//     console.table(arr)
//
//     for (let z = 0; z < arr[i].length; z++){
//         // lower word placement chance
//         if (Math.random() > 0.4){
//             console.log("not this index");
//             continue
//         }
//         // if word exist in index skip this index
//         if (arr[i][z] !== "_"){
//             console.log("there is a letter there");
//             continue
//         }
//
//         //chose vert or horizontal
//         let num = Math.floor(Math.random() > 0.5)
//
//         // true = vettical, false = horizontal
//         let availableLen = 9 - z;
//         let availableHeight = 9 - i;
//
//
//
//         if (num){
//             // if there is room in the array
//             if (word.length > availableHeight){
//                 continue
//             }
//             // check if the spaces are taken up
//             let clear = true
//             for (let g = 0 ; g < word.length; g++){
//                 if (arr[i+g][z] !== "_"){
//                     clear = false
//                 }
//             }
//             if (!clear){ continue }
//             // fill word into the main array
//             for (let a = 0; a < word.length; a++){
//                 arr[i+a][z] = word[a];
//             }
//             word = list[i +1]
//             continue
//         }
//
//         if(!num){
//             // check if there is room in the array
//             if (word.length > availableLen){
//                 continue
//             }
//             // check if the spaces are availableLen
//             let clear = true
//             for (let g = 0 ; g < word.length; g++){
//                 if (arr[i+g][z] !== "_"){
//                     clear = false
//                 }
//             }
//             if (!clear){ continue }
//             // fill the word in the main array
//             for (let a = 0; a < word.length; a++){
//                 arr[i][z+a] = word[a];
//             }
//             word = list[i +1]
//             continue
//         }
//     }
// }
// return arr


// const fillBoard = (arr, list) => {
//
//     while (wordList.length > 1){
//
//         let word = wordList[wordList.length -1]
//         for (let i = 0; i < arr.length; i++){
//             console.table(arr)
//             for (let z = 0; z < arr[i].length; z++){
//                 // lower word placement chance
//                 if (Math.random() > 0.4){
//                     console.log("not this index");
//                     continue
//                 }
//                 // if word exist in index skip this index
//                 if (arr[i][z] !== "_"){
//                     console.log("there is a letter there");
//                     continue
//                 }
//
//                 //chose vert or horizontal
//                 let num = Math.floor(Math.random() > 0.5)
//
//                 // true = vettical, false = horizontal
//                 let availableLen = 9 - z;
//                 let availableHeight = 9 - i;
//
//
//
//                 if (num){
//                     // if there is room in the array
//                     if (word.length > availableHeight){
//                         continue
//                     }
//                     // check if the spaces are taken up
//                     let clear = true
//                     for (let g = 0 ; g < word.length; g++){
//                         if (arr[i+g][z] !== "_"){
//                             clear = false
//                         }
//                     }
//                     if (!clear){ continue }
//                     // fill word into the main array
//                     for (let a = 0; a < word.length; a++){
//                         arr[i+a][z] = word[a];
//                     }
//                     wordList.pop()
//                 }
//
//                 if(!num){
//                     // check if there is room in the array
//                     if (word.length > availableLen){
//                         continue
//                     }
//                     // check if the spaces are availableLen
//                     let clear = true
//                     for (let g = 0 ; g < word.length; g++){
//                         if (arr[i+g][z] !== "_"){
//                             clear = false
//                         }
//                     }
//                     if (!clear){ continue }
//                     // fill the word in the main array
//                     for (let a = 0; a < word.length; a++){
//                         arr[i][z+a] = word[a];
//                     }
//                     wordList.pop();
//                 }
//             }
//         }
//     }
//     return arr
// }
