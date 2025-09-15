// مؤقت بسيط — مثال
let timer = null;
let seconds = 0;
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function formatTime(sec) {
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return mm + ":" + ss;
}

startBtn.onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    seconds++;
    display.textContent = formatTime(seconds);
  }, 1000);
};

stopBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
};
