const startBtn = document.querySelector('.main');
const resetBtn = document.querySelector('.reset');
const divTime = document.querySelector('div.time>div');
let active = false;
let first = true;
ms = 0;
s = 0;
m = 0;
let timer;

const addSec = () => {
    ms++;
    if (ms == 60) {
        s++;
        ms = 0;
    }
    if (s == 60) {
        m++;
        s = 0;
    }
    divTime.textContent = "";
    if (m < 10)
        divTime.textContent += "0";
    divTime.textContent += `${m}:`;

    if (s < 10)
        divTime.textContent += "0";
    divTime.textContent += `${s}:`;

    if (ms < 10)
        divTime.textContent += "0";
    divTime.textContent += `${ms}`;
}

startBtn.addEventListener("click", () => {
    active = !active;
    if (active) {
        startBtn.textContent = "Stop";
        timer = setInterval(addSec, 1);
    } else {
        startBtn.textContent = "Wznów";
        clearInterval(timer);
    }
})

resetBtn.addEventListener("click", () => {
    ms = 0;
    s = 0;
    m = 0;
    divTime.textContent = "---";
    active = false;
    startBtn.textContent = "Start";
    clearInterval(timer);
})