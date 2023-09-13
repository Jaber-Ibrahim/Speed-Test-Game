//hide and unhide elements in my page
let myBtnInst = document.querySelector(".instructions ul li:last-child");
let instCont = document.querySelector(".instructions");
let chooseLevelCont = document.querySelector(".choose-level");
let selectLevel = document.querySelector(".select");
let mainCont = document.querySelector(".container");

// input element
let input = document.querySelector(".input");
//disable paste
input.onpaste = function () {
    return false;
};

//finish message
let finishMeassage = document.querySelector(".finish");

//restart button to restart
let restartGame = document.querySelector(".restart");
restartGame.addEventListener("click", () => {
    location.reload();
});

//control spans in my page
let levelSpan = document.querySelector(".message .lvl");
let secondsOfLevelSpan = document.querySelector(".message .seconds");
let timeLeftSpan = document.querySelector(".time span");
let yourScoreSpan = document.querySelector(".score .got");
let totalScoreSpan = document.querySelector(".score .total");

//hide the instructions container and unhide choose level cont
myBtnInst.addEventListener('click', () =>{
    instCont.style.display = "none";
    chooseLevelCont.style.display = "block";
});

const objectOfLevels = {
  easy: 4,
  normal: 3,
  hard: 2,
  pro: 1,
};

// generate random words
const characters = "abcdefghijklmnopqrstuvqxyz";
const arrayOfWords = [];
function generateArrayOfWords (numberOfWords , wordLength ) {
    for (let i = 0; i < numberOfWords; i++) {
        let word = "";
        for (let j = 0; j < wordLength; j++) {
            word += characters[Math.floor(Math.random() * characters.length)];
        }
        arrayOfWords.push(word);
    }
}

selectLevel.addEventListener("change", () => {
    //generate random Array according to choosen level
    if (objectOfLevels[selectLevel.value] == "4"){generateArrayOfWords(10,2)}
    else if (objectOfLevels[selectLevel.value] == "3"){generateArrayOfWords(15,3)}
    else if (objectOfLevels[selectLevel.value] == "2"){generateArrayOfWords(20,4)}
    else if (objectOfLevels[selectLevel.value] == "1"){generateArrayOfWords(25,5)};
    
    totalScoreSpan.innerHTML = arrayOfWords.length;
  // console.log(selectLevel.value);
  chooseLevelCont.style.display = "none";
  mainCont.style.display = "block";
  //   console.log(selectLevel.value);
  levelSpan.innerHTML = selectLevel.value.toUpperCase();
  secondsOfLevelSpan.innerHTML = objectOfLevels[selectLevel.value];
  yourScoreSpan.innerHTML = 0;
});

//To check The Generated Array
// console.log(arrayOfWords);

// const arrayOfWords = ["jabeeeer", "jaberar","jabertt","jaberrrr","jaberqq"]  for testing

//the div that hold the coming word
let wordComing = document.querySelector(".the-word");
let containOfWords = document.querySelector(".upcoming-words");

//click start button to play
let startButton = document.querySelector(".start");

startButton.onclick = function () {
  //remove this button
  this.remove();
  //focus on the input field
  input.focus();
  //add words and div to my page
  addWord();
};

let started = true;
//add words and div to my  function
function addWord() {
  started
    ? (timeLeftSpan.innerHTML = objectOfLevels[selectLevel.value] + 5)
    : (timeLeftSpan.innerHTML = objectOfLevels[selectLevel.value]);
  started = false;

  //get random word from my array
  let randomComingWord =
    arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
  //get the index of my word
  let indexOfComingWord = arrayOfWords.indexOf(randomComingWord);
  //delete the word from my array
  arrayOfWords.splice(indexOfComingWord, 1);
  //   console.log(arrayOfWords);
  //empty the words container
  containOfWords.innerHTML = "";
  wordComing.innerHTML = randomComingWord;

  // startButton.style.display= "none" ;
  arrayOfWords.forEach((el) => {
    let div = document.createElement("div");
    let divText = document.createTextNode(el);
    div.appendChild(divText);
    containOfWords.appendChild(div);
  });
  //call the play function to control score and time
  play();
}

function play() {
  let timer = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(timer);
      //compare when defautl time finish
      if (wordComing.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //empty the input field
        input.value = "";
        //increase your score
        yourScoreSpan.innerHTML++;
        if (arrayOfWords.length > 0) {
          addWord();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation, You Are Perfect");
          span.appendChild(spanText);
          finishMeassage.appendChild(span);
        }
      } else  {
        if (yourScoreSpan.innerHTML === "0") {
            let span = document.createElement("span");
            span.className = "bad";
            let spanText = document.createTextNode("Game Over");
            span.appendChild(spanText);
            finishMeassage.appendChild(span);
        }
        else {
            let span = document.createElement("span");
            span.className = "bad";
            let spanText = document.createTextNode("Keep Up Training");
            span.appendChild(spanText);
            finishMeassage.appendChild(span);

        }
      }
    }
  }, 1000);
}
