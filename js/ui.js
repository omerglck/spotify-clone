import { elements } from "./helpers.js";

//* Her bir müzik için ekrana o müzikle ilgili belirlediğimiz şeyleri ekrana basar
export const renderSongs = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    const div = document.createElement("div");
    //* kart datasına kart elemanına bazı verileri ekleme
    div.dataset.url = song.hub?.actions?.pop()?.uri;
    div.dataset.title = song.title;
    div.dataset.img = song.images.coverart;

    div.className = "card";
    div.innerHTML = `
        <figure>
              <img
                src="${song.images.coverart}"
                alt=""
              />
            <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
            </div>
        </figure>
            <h4>${song.subtitle}</h4>
            <p>${song.title}</p>
    `;
    elements.list.appendChild(div);
  });
};

//* Çalan şarkının bilgilerini ekrana basma
export const renderPlayingInfo = (song) => {
  elements.playingInfo.innerHTML = `
      <img  id="info-img"
      src=${song.img} />
      <div>
        <p>Şu an oynatılıyor...</p>
        <h3>${song.title}</h3>
      </div>
  `;
};

// başlıığ günceller
export const updateTitle = (message) => {
  elements.title.innerHTML = message;
};
