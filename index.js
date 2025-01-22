const timeDisplay = document.querySelector('.time-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const stopBtn = document.getElementById('stop');
const lapsContainer = document.getElementById('laps');

let timer = null; // Timer interval reference
let elapsedTime = 0; // Total elapsed time in milliseconds
let isRunning = false; // Indicates if the stopwatch is running
let startTime = null; // Timestamp of when the timer was started or resumed

// Update the time display
function updateTime() {
  const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
  const hrs = String(Math.floor(currentTime / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((currentTime % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((currentTime % 60000) / 1000)).padStart(2, '0');
  const millis = String(Math.floor(currentTime % 1000)).padStart(3, '0');
  timeDisplay.textContent = `${hrs}:${mins}:${secs}.${millis}`;
}

// Start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateTime, 10); // Update every 10ms
  }
}

// Pause the timer
function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime; // Add the time since the last start
    isRunning = false;
  }
}

// Record a lap time
function addLap() {
  if (isRunning) {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeDisplay.textContent;
    lapsContainer.appendChild(lapTime);
  }
}

// Reset the stopwatch and clear all laps
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateTime(); // Reset display
  lapsContainer.innerHTML = ''; // Clear all lap records
}

// Stop the timer completely and clear everything
function stopTimer() {
  resetTimer(); // Reset everything
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
lapBtn.addEventListener('click', addLap); // Add Lap functionality
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);

// Initialize the time display
updateTime();
