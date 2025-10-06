import "./style.css";

const startBtnEl = document.getElementById("startBtn");
const screenEl = document.querySelectorAll(".screen");
const chooseBtnEl = document.querySelectorAll(".chooseBtn");
const containerEl = document.getElementById("container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
let second = 0;
let score = 0;
let selectedEl = {};
console.log(screenEl);

startBtnEl.addEventListener("click", () => {
  screenEl[0].classList.add("up");
});

chooseBtnEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn);
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    console.log(img, src);
    selectedEl = { src };
    screenEl[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});


function createInsect() {
  const insert = document.createElement("div");
  insert.classList.add("insert");
  const { x, y } = randomLocation();
  console.log(x, y);
  insert.style.top = `${y}px`;
  insert.style.left = `${x}px`;
  insert.innerHTML = `<img src="${selectedEl.src}"/>`;

  insert.addEventListener("click", catchInsect);
  containerEl.appendChild(insert);
}

function randomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  scoreEl.innerHTML = `Score: ${score}`;
}


function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(second / 60);
  let s = second % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  console.log(second);
  second++;
}