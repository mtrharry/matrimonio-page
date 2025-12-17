// Cuenta regresiva
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

  document.getElementById("d").textContent = pad(days);
  document.getElementById("h").textContent = pad(hours);
  document.getElementById("m").textContent = pad(mins);
  document.getElementById("s").textContent = pad(secs);
}

document.addEventListener("DOMContentLoaded", () => {
  tick();
  setInterval(tick, 1000);

  // reveal
  const items = document.querySelectorAll(".section");
  items.forEach(s => s.classList.add("reveal"));

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  items.forEach(s => io.observe(s));

  // Música
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
        alert("Toca nuevamente para activar el sonido.");
      }
    });
  }

  // Intro sobre
  const intro = document.getElementById("intro");
  const envelope = document.getElementById("envelope");
  const main = document.querySelector("main.paper");

  if (main) main.style.display = "none";

  function openInvitation(){
  if (!envelope || !intro) return;

  envelope.style.pointerEvents = "none";
  envelope.classList.add("open");
  setTimeout(() => intro.classList.add("fade-out"), 900);

  setTimeout(async () => {
    intro.remove();
    if (main) main.style.display = "";
    window.scrollTo(0, 0);

    // ✅ Intentar iniciar música al entrar
    if (music && musicBtn) {
      try {
        await music.play();
        isPlaying = true;
        musicBtn.textContent = "🔇 Pausar música";
        musicBtn.classList.add("playing");
      } catch (e) {
        // Si el navegador bloquea autoplay, el botón queda para que el usuario la active
        isPlaying = false;
        musicBtn.textContent = "🔊 Activar música";
        musicBtn.classList.remove("playing");
      }
    }
  }, 1700);
  }


    if (envelope) {
      envelope.addEventListener("click", openInvitation);
      envelope.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") openInvitation();
      });
    }

    // Slider recuerdos
    const memories = document.querySelectorAll(".memory");
    let currentMemory = 0;

    if (memories.length > 0) {
      setInterval(() => {
        memories[currentMemory].classList.remove("active");
        currentMemory = (currentMemory + 1) % memories.length;
        memories[currentMemory].classList.add("active");
      }, 3000);
    }
  // 🔇 Pausar música al cambiar de pestaña / minimizar
  document.addEventListener("visibilitychange", () => {
    if (!music) return;
    if (document.hidden) {
      music.pause();
      isPlaying = false;
      if (musicBtn) {
        musicBtn.textContent = "🔊 Activar música";
        musicBtn.classList.remove("playing");
      }
    }
  });

  // 🔇 Pausar música al salir de la página (redirigir / cerrar)
  window.addEventListener("pagehide", () => {
    if (!music) return;
    music.pause();
    isPlaying = false;
  });
function setUiPaused(){
  isPlaying = false;
  if (musicBtn){
    musicBtn.textContent = "🔊 Activar música";
    musicBtn.classList.remove("playing");
  }
}

function pauseMusic(){
  if (!music) return;
  music.pause();
  setUiPaused();
}

// 1) Pausar al perder foco (muy efectivo cuando abres otra pestaña / app)
window.addEventListener("blur", pauseMusic);

// 2) Pausar ANTES de abrir enlaces externos (Maps / WhatsApp / cualquier target=_blank)
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;

  const href = a.getAttribute("href") || "";
  const isExternal =
    a.target === "_blank" ||
    href.startsWith("http") ||
    href.startsWith("https") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) pauseMusic();
}, true);
// 🎁 Regalos: botón "Ver datos"
const giftBtn = document.querySelector(".gift-btn");
const giftDetails = document.getElementById("gift-details");

if (giftBtn && giftDetails) {
  giftBtn.addEventListener("click", () => {
    const isOpen = !giftDetails.hidden;
    giftDetails.hidden = isOpen;

    giftBtn.classList.toggle("is-open", !isOpen);
    giftBtn.setAttribute("aria-expanded", String(!isOpen));
    giftBtn.textContent = !isOpen ? "Ocultar dirección" : "Ver dirección";
  });
}

});
