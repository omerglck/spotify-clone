import { elements } from "./js/helpers.js";
import { API } from "./js/api.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";

console.log(elements.textAside);
// Açılır kapanır menu
elements.menu.addEventListener("click", () => {
  elements.ulList.classList.toggle("toggle");
});

elements.asideOpen.addEventListener("click", () => {
  elements.asideFigure.classList.toggle("asideActive");
});

//* Class yapısını kullanabilmek için bir örneğini oluşturduk
const api = new API();

//* Sayfa yüklendiği anda api'a istek atık popüler müzikleri listeler
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

//* Parametre olarak aldığı müziği çalar
const playMusic = (url) => {
  // müziğin url'inin HTML'e aktarma
  elements.audioSource.src = url;
  //audio elementinin müziği yüklemesini sağladık
  elements.audio.load();

  //audio elementinin müziği oynatır
  elements.audio.play();
};

//* Liste de tıklamalarda çalışır
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    const parent = e.target.closest(".card"); //parentelement yerine kullanırız en yakın ebevenye götürür
    console.log(parent.dataset);
    //*çalınacak müziğin bilgilerini ekrana basar
    renderPlayingInfo(parent.dataset);
    //* Müziği çalar
    playMusic(parent.dataset.url);
  }
};

//* Liste alanındaki tıklamaları izleme
document.addEventListener("click", handleClick);

// fotoğrafı döndürür
const animatePhoto = (e) => {
  const img = document.querySelector(".info img");
  img.className = "animate";
};

const stopAnimation = (e) => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");
};

//* müziği çalma olayını izleme
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);

//* Form olaylarınız izleme
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;

  if (!query) return;

  // başlığı güncelle
  updateTitle(`${query} İçin Sonuçlar`);
  // aratılan kelimeyle eşleşen müzikleri çeker
  api.searchMusic(query);
});
