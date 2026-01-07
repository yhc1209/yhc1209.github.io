
let timer;
let timeLeft;
let currentRound = 1;
let isWorking = true;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const roundDisplay = document.getElementById('round-display');
const startBtn = document.getElementById('startBtn');

// 嗶聲函數
function playSound(frequency = 440, duration = 0.2) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = frequency;
    oscillator.start();
    setTimeout(() => oscillator.stop(), duration * 1000);
}

function updateDisplay() {
    timerDisplay.innerText = timeLeft;
    roundDisplay.innerText = `回合: ${currentRound} / ${document.getElementById('totalRounds').value}`;
    
    if (isWorking) {
        statusDisplay.innerText = "運動中 🔥";
        timerDisplay.className = "timer-display work-mode";
    } else {
        statusDisplay.innerText = "休息時間 🧊";
        timerDisplay.className = "timer-display rest-mode";
    }
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        startBtn.innerText = "繼續";
        isRunning = false;
        return;
    }

    const workSec = parseInt(document.getElementById('workTime').value);
    const restSec = parseInt(document.getElementById('restTime').value);
    const totalRounds = parseInt(document.getElementById('totalRounds').value);

    if (!timeLeft) timeLeft = workSec;
    isRunning = true;
    startBtn.innerText = "暫停";

    timer = setInterval(() => {
        timeLeft--;
        
        // 最後三秒嗶一聲
        if (timeLeft <= 3 && timeLeft > 0) playSound(600, 0.1);
        if (timeLeft === 0) playSound(800, 0.5);

        if (timeLeft < 0) {
            if (isWorking) {
                isWorking = false;
                timeLeft = restSec;
            } else {
                isWorking = true;
                currentRound++;
                timeLeft = workSec;
            }

            if (currentRound > totalRounds) {
                clearInterval(timer);
                alert("恭喜完成訓練！");
                reset();
                return;
            }
        }
        updateDisplay();
    }, 1000);
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    isWorking = true;
    currentRound = 1;
    timeLeft = null;
    startBtn.innerText = "開始訓練";
    statusDisplay.innerText = "準備開始";
    timerDisplay.innerText = "00";
    timerDisplay.className = "timer-display";
    roundDisplay.innerText = "回合: 0 / 8";
}

startBtn.addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', reset);