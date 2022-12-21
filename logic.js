/**
 * Rock, Paper, Scissor Game
 * 
 */

// It's a rps game best of 5
// function "rounds": by default it's 5 rounds in a game, best of 5 (done)

// Start one round
// User picks (done)
// [Rock, Paper, Scissor] (done)
// 0: Rock
// 1: Paper
// 2: Scissor

// Machine also picks from 0 - 2 (done)
// done by using the method Math.random() and floor 

// Then we do compare between user pick and machine pick (done)

const OPTIONS = ["Rock", "Paper", "Scissor"];
const RESULT = {
  userWinningAmount: 0,
  userLosingAmount: 0,
  machineWinningAmount: 0,
  machineLosingAmount: 0
};
const selections = document.querySelectorAll(".selections button");

let resultText = document.querySelector(".result .text");
let resultMark = document.querySelector(".result .mark");
let resetBtn = document.querySelector("button.reset");


selections.forEach(selection => {
  selection.addEventListener("click", playRound);
})

resetBtn.addEventListener("click", restart);

function playRound(e) {
  let userPick = OPTIONS[e.target.dataset.id];
  let machinePick = machineInput(OPTIONS);
  result(userPick, machinePick, OPTIONS, RESULT);
}


function result(userPick, machinePick) {
  console.log(`You pick ${userPick}...`);
  if(userPick === machinePick) {
    updateResult("tie", userPick, machinePick);
  }
  if(userPick === "Rock" && machinePick === "Scissor") {
    updateResult("win", userPick, machinePick);
  }
  if(userPick === "Rock" && machinePick === "Paper") {
    updateResult("lose", userPick, machinePick);
  }
  if(userPick === "Paper" && machinePick === "Rock") {
    updateResult("win", userPick, machinePick);
  }
  if(userPick === "Paper" && machinePick === "Scissor") {
    updateResult("lose", userPick, machinePick);
  }
  if(userPick === "Scissor" && machinePick === "Paper") {
    updateResult("win", userPick, machinePick);
  }
  if(userPick === "Scissor" && machinePick === "Rock") {
    updateResult("lose", userPick, machinePick);
  }
}

function updateResult(status, userPick, machinePick) {
  let text = ""
  console.log("status:", status)
  if(status == "win") {
    text = `You win!!! ${userPick} beats ${machinePick}.`;
    RESULT.userWinningAmount++;
    RESULT.machineLosingAmount++;
  }
  else if(status == "lose") {
    text = `You lose!!! ${userPick} is beaten by ${machinePick}.`;
    RESULT.userLosingAmount++;
    RESULT.machineWinningAmount++;
  }
  else if(status == "tie") {
    text = `Tie!!!`;
  }
  resultText.innerText = text;
  
  if(!(RESULT.userWinningAmount === 5 || RESULT.machineWinningAmount === 5)) {
    resultMark.innerText = `Player: ${RESULT.userWinningAmount} vs Machine: ${RESULT.machineWinningAmount}`;
  }

  if(RESULT.userWinningAmount === 5) {
    resultMark.innerText = `Player Wins!!!\nPlayer: ${RESULT.userWinningAmount} vs Machine: ${RESULT.machineWinningAmount}`;
    refresh();

  }

  if(RESULT.machineWinningAmount === 5) {
    resultMark.innerText = `Player Loses!!!\nPlayer: ${RESULT.userWinningAmount} vs Machine: ${RESULT.machineWinningAmount}`;
    refresh();
  }

}
function machineInput(OPTIONS) {
  return OPTIONS[getRandomInt(OPTIONS.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function refresh() {
  for(let key of Object.keys(RESULT)) {
    RESULT[key] = 0;
  }
  selections.forEach(selection => {
    selection.setAttribute("disabled", "");
  })
  resetBtn.removeAttribute("disabled");

}

function restart() {
  resultText.innerText = "";
  resultMark.innerText = "";
  selections.forEach(selection => {
    selection.removeAttribute("disabled");
  })
  resetBtn.setAttribute("disabled", "");
}

