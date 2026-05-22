let interval;
let bpm = 80;

function startMetro(){
  stopMetro();
  const ms = 60000 / bpm;
  interval = setInterval(()=>{
    const osc = new (window.AudioContext || window.webkitAudioContext)();
    const o = osc.createOscillator();
    const g = osc.createGain();
    o.connect(g); g.connect(osc.destination);
    o.frequency.value = 880;
    o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, osc.currentTime + 0.1);
    setTimeout(()=>osc.close(),200);
  }, ms);
  document.getElementById("metroStatus").innerText="Playing "+bpm+" BPM";
}

function stopMetro(){
  if(interval) clearInterval(interval);
  document.getElementById("metroStatus").innerText="Stopped";
}

function showScale(){
  const scale = ["C","D","E","F","G","A","B","C"];
  document.getElementById("scaleBox").innerText = scale.join(" - ");
}

const chords = [
  {n:"C",t:"major"},
  {n:"A",t:"minor"},
  {n:"G",t:"major"},
  {n:"E",t:"minor"},
  {n:"D",t:"major"}
];

let current;

function quiz(){
  current = chords[Math.floor(Math.random()*chords.length)];
  document.getElementById("quizBox").innerText = "Chord: "+current.n;
  document.getElementById("result").innerText = "";
}

function check(){
  const ans = document.getElementById("answer").value.trim().toLowerCase();
  if(ans === current.t){
    document.getElementById("result").innerText = "Correct ✔";
  } else {
    document.getElementById("result").innerText = "Wrong ❌ It was "+current.t;
  }
}

function addSession(){
  let s = localStorage.getItem("sessions")||0;
  s = parseInt(s)+10;
  localStorage.setItem("sessions",s);
  document.getElementById("sessions").innerText = "Total minutes: "+s;
}

function load(){
  let s = localStorage.getItem("sessions")||0;
  document.getElementById("sessions").innerText = "Total minutes: "+s;
}
load();

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js");
}
