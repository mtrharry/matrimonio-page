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

  // Música de fondo
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  let isPlaying = false;

  if (music && musicBtn) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await music.play();
          musicBtn.textContent = "🔇 Pausar música";
          musicBtn.classList.add("playing");
        } else {
          music.pause();
          musicBtn.textContent = "🔊 Activar música";
          musicBtn.classList.remove("playing");
        }
        isPlaying = !isPlaying;
      } catch (e) {
        // Si el navegador bloquea por alguna razón
        alert("Toca nuevamente para activar el sonido.");
      }
    });
  }
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
