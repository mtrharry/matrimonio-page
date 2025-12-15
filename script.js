// Cuenta regresiva hasta: 30 de enero 2025 16:30 (hora local del dispositivo)
const target = new Date(2026, 0, 30, 16, 30, 0);


function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target.getTime() - now.getTime();

  if (diff < 0) {
  document.getElementById("countdown").innerHTML =
    "<p style='text-align:center;font-weight:600;'>¡Hoy es el gran día! 💍✨</p>";
  return;
}


  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const dEl = document.getElementById("d");
  const hEl = document.getElementById("h");
  const mEl = document.getElementById("m");
  const sEl = document.getElementById("s");

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(mins);
  if (sEl) sEl.textContent = pad(secs);
}

document.addEventListener("DOMContentLoaded", () => {
  tick();
  setInterval(tick, 1000);

  // Animaciones al hacer scroll
  const items = document.querySelectorAll(".section");
  items.forEach(s => s.classList.add("reveal"));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  items.forEach(s => io.observe(s));

 
});
// Slider automático de recuerdos
const memories = document.querySelectorAll(".memory");
let currentMemory = 0;

if (memories.length > 0) {
  setInterval(() => {
    memories[currentMemory].classList.remove("active");
    currentMemory = (currentMemory + 1) % memories.length;
    memories[currentMemory].classList.add("active");
  }, 3000); // cambia cada 3 segundos
}
// ===== Intro Sobre =====
const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const main = document.querySelector("main.paper");

// Oculta la invitación hasta abrir
if (main) main.style.display = "none";

function openInvitation(){
  envelope.style.pointerEvents = "none";
  setTimeout(() => {
    intro.remove();
    if (main) main.style.display = "";
    window.scrollTo(0, 0);

    // intentar reproducir el video al abrir
    const v = document.getElementById("heroVideo");
    if (v) {
      v.muted = false;   // si quieres audio, déjalo así
      v.play().catch(()=>{});
    }
  }, 1700);

  if (!envelope || !intro) return;

  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("fade-out");
  }, 900);

  setTimeout(() => {
    intro.remove();
    if (main) main.style.display = "";
    window.scrollTo(0, 0);
  }, 1700);
}

if (envelope) {
  envelope.addEventListener("click", openInvitation);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openInvitation();
  });
}
