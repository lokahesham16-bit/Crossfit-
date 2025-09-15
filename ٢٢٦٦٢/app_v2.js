
/* Timer PWA Final v2 - EMOM extended: minutes, restSeconds, rounds override */
const modes = document.querySelectorAll('.mode');
const settings = document.getElementById('settings');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const timeEl = document.getElementById('time');
const labelEl = document.getElementById('label');
const roundInfo = document.getElementById('roundInfo');
const hiitEditor = document.getElementById('hiitEditor');
const hiitList = document.getElementById('hiitList');
const addRoundBtn = document.getElementById('addRound');
const saveHIITBtn = document.getElementById('saveHIIT');
const openAnghamiBtn = document.getElementById('openAnghami');
const importTrainTrackBtn = document.getElementById('importTrainTrack');

let selectedMode = 'tabata';

// Defaults & storage
let tabata = { rounds:8, work:20, rest:10 };
let amrap = { minutes:20 };
// EMOM extended: minutes (default rounds), restSeconds inside minute, rounds override (0 means use minutes)
let emom = { minutes:10, restSeconds:20, rounds:0 };
let hiitRounds = JSON.parse(localStorage.getItem('hiitRounds') || '[]');

// Timer state
let timer = null;
const prepTime = 10;
let timeRemaining = 0;
let isPreparing = false;
let currentRound = 0;
let totalRounds = 0;
let isWorkPhase = true;

// TTS helper
function tts(msg){
  if(!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(msg);
  const voices = speechSynthesis.getVoices();
  let v = voices.find(x => x.lang && x.lang.startsWith('en') && x.name && x.name.toLowerCase().includes('siri'));
  if(!v) v = voices.find(x => x.lang && x.lang.startsWith('en') && x.name && /female|woman|voice/i.test(x.name));
  if(!v) v = voices.find(x => x.lang && x.lang.startsWith('en'));
  if(v) u.voice = v;
  u.rate = 0.95;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// UI init
function renderSettings(){
  hiitEditor.classList.add('hidden');
  settings.innerHTML = '';
  if(selectedMode === 'tabata'){
    settings.innerHTML = `
      <label>Rounds: <input id="tabataRounds" type="number" min="1" value="${tabata.rounds}"></label>
      <div class="row"><label>Work (s): <input id="tabataWork" type="number" min="1" value="${tabata.work}"></label>
      <label>Rest (s): <input id="tabataRest" type="number" min="0" value="${tabata.rest}"></label></div>
    `;
  } else if(selectedMode === 'amrap'){
    settings.innerHTML = `<label>Minutes: <input id="amrapMinutes" type="number" min="1" value="${amrap.minutes}"></label>`;
  } else if(selectedMode === 'emom'){
    settings.innerHTML = `
      <div class="row"><label>Minutes (or rounds): <input id="emomMinutes" type="number" min="1" value="${emom.minutes}"></label>
      <label>Rounds (0 = use minutes): <input id="emomRounds" type="number" min="0" value="${emom.rounds}"></label></div>
      <div class="row"><label>Rest inside minute (s): <input id="emomRest" type="number" min="0" max="59" value="${emom.restSeconds}"></label>
      <small style="margin-left:8px;color:#9aa5b1">Work = 60 - rest</small></div>
    `;
  } else if(selectedMode === 'hiit'){
    settings.innerHTML = `<div>HIIT rounds: ${hiitRounds.length} • <button id="openHIIT">Open HIIT Setup</button></div>`;
    setTimeout(()=>{
      document.getElementById('openHIIT')?.addEventListener('click', ()=> showHIITEditor());
    },10);
  }
}

function showHIITEditor(){
  hiitEditor.classList.remove('hidden');
  renderHIITList();
}

def make_icon(path, size):
    pass
