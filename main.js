let duration = 1000;
let timerMin = document.querySelector(".info .timer span:first-child");
let timerSec = document.querySelector(".info .timer span:last-child");
let ourTimer;
timeInMin = "2";
timeInSec = "00";
timerMin.innerHTML = timeInMin;
timerSec.innerHTML = timeInSec;

document.querySelector(".start-game span").onclick = function () {
  let userName = prompt("Enter Your Name Please!");
  let name = document.querySelector(".info .name span");
  if (userName === null || userName === "") name.textContent = "Unknown";
  else name.textContent = userName;
  document.querySelector(".start-game").remove();

  ourTimer = setInterval(timerCountDown, duration);
};

function timerCountDown() {
  if (+timerSec.innerHTML === 0) {
    timerSec.innerHTML = 60;
    timerMin.innerHTML -= 1;
  }
  timerSec.innerHTML -= 1;
  if (+timerSec.innerHTML < 10) {
    timerSec.innerHTML = "0" + timerSec.innerHTML;
  }

  if (+timerSec.innerHTML === 0 && +timerMin.innerHTML === 0) {
    clearInterval(ourTimer);
  }
}

let blocksContainer = document.querySelector(".game-blocks");
let blocks = [...blocksContainer.children];
let allBlocks = document.querySelectorAll(".game-blocks .block");

blocksOrder = [...Array(allBlocks.length).keys()];

shuffleBlocks(blocksOrder);

allBlocks.forEach((el, i) => {
  el.style.order = blocksOrder[i];
});

allBlocks.forEach((el) => {
  el.addEventListener("click", flipClickedBlock);
});

function flipClickedBlock() {
  this.classList.add("flipped");

  let flippedBlocks = blocks.filter((block) =>
    block.classList.contains("flipped")
  );
  if (flippedBlocks.length === 2) {
    stopClick();
    setTimeout(() => {
      checkSameCards(flippedBlocks[0], flippedBlocks[1]);
    }, duration);
  }
}

function stopClick() {
  blocksContainer.classList.add("no-click");
  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}

function checkSameCards(first, second) {
  first.classList.remove("flipped");
  second.classList.remove("flipped");

  if (first.getAttribute("data-block") === second.getAttribute("data-block")) {
    first.classList.add("matched");
    second.classList.add("matched");

    let numberMatched = 0;
    allBlocks.forEach((el) => {
      if (el.classList.contains("matched")) numberMatched++;
    });
    if (numberMatched === allBlocks.length) {
      document.querySelector(".finish-game").style.display = "grid";
      clearInterval(ourTimer);
    }
  } else {
    let tries = document.querySelector(".info .tries span");
    tries.innerHTML = +tries.innerHTML + 1;
  }
}

setInterval(() => {
  if (+timerSec.innerHTML === 0 && +timerMin.innerHTML === 0) {
    document.querySelector(".finish-game span:first-child").textContent =
      "Game Over";
    document.querySelector(".finish-game").style.display = "grid";
  }
}, duration);

function shuffleBlocks(arr) {
  let current = arr.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
  }
  return arr;
}

document.querySelector(".finish-game span:last-child").onclick = function () {
  let userName = prompt("Enter Your Name Please!");
  let name = document.querySelector(".info .name span");
  if (userName === null || userName === "") name.textContent = "Unknown";
  else name.textContent = userName;
  document.querySelector(".finish-game").style.display = "none";
  // blocksOrder = [...Array(allBlocks.length).keys()];
  shuffleBlocks(blocksOrder);
  allBlocks.forEach((el, i) => {
    el.classList.remove("matched");
    el.style.order = blocksOrder[i];
  });
  document.querySelector(".info .tries span").innerHTML = 0;

  timerMin.innerHTML = timeInMin;
  timerSec.innerHTML = timeInSec;
  ourTimer = setInterval(timerCountDown, duration);
};
