let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let running = false;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("lapList");

// Update Stopwatch
function updateTime() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
  millisecondsEl.textContent = milliseconds < 10 ? "0" + milliseconds : milliseconds;
}

// Start or Pause
startStopBtn.addEventListener("click", () => {
  if (!running) {
    interval = setInterval(updateTime, 10);
    running = true;
    startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    startStopBtn.style.background = "#f39c12";
  } else {
    clearInterval(interval);
    running = false;
    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startStopBtn.style.background = "#27ae60";
  }
});

// Reset
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  running = false;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
  millisecondsEl.textContent = "00";
  startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
  startStopBtn.style.background = "#27ae60";
  lapList.innerHTML = "";
});

// Record Lap
lapBtn.addEventListener("click", () => {
  if (running) {
    const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    const li = document.createElement("li");
    li.innerHTML = `<i class="fas fa-flag-checkered"></i> Lap ${lapList.childElementCount + 1}: ${lapTime}`;

    // Remove highlight from old laps
    Array.from(lapList.children).forEach(lap => lap.classList.remove("highlight"));

    // Highlight the latest lap
    li.classList.add("highlight");

    lapList.appendChild(li);
  }
});
