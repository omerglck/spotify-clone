import { renderSongs } from "./ui.js";

//* Yapılan istekler için gereli olan ayarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=tr-TR&listId=ip-country-chart-TR";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

//* API'isteklerini yönettiğimiz class yapısı
export class API {
  constructor() {
    this.songs = [];
  }
  //* Popüler müzikleri getirir
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();
    //* API'dan aldığımız trackleri songs dizisine aktardık
    this.songs = data.tracks;
    //* Ekrana popüler müzikleri ekrana basma
    renderSongs(this.songs);
  }
  //* Arama Metodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
      options
    );
    const data = await res.json();
    // Veriyi istediğimiz hale çevirme
    // song.track yerine song'a eirişince
    const newData = data.tracks.hits.map((song) => ({ ...song.track }));
    console.log(newData);
    this.songs = newData;
    // aratılan şarkıları ekrana basöa
    renderSongs(this.songs);
  }
}
