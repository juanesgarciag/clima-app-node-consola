import fs from "fs";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const MAPBOX_KEY = process.env.MAPBOX_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

class Searchs {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    //Leer DB si existe
    this.readDB();
  }

  get paramsMapbox() {
    return {
      access_token: `${MAPBOX_KEY}`,
      language: "es",
      limit: 5,
    };
  }

  get paramsOpenweather() {
    return {
      units: "metric",
      lang: "es",
      appid: `${OPENWEATHER_KEY}`,
    };
  }

  get capitalizationHistory () {
    return this.historial.map( place => {
        
        let words = place.split(' ');
        words = words.map( w => w[0].toUpperCase() + w.substring(1));

        return words.join(' ');
    })
  }

  async city(place = "") {
    try {
      //peticion HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: { ...this.paramsOpenweather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  pushHistory(place = "") {
    if (this.historial.includes(place.toLowerCase())) return;

    this.historial.unshift(place.toLowerCase());

    //Grabar en DB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      historial: this.historial,
    };

    this.historial = this.historial.splice(0,5);

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    //JSON.parse convierte en un objeto string el JSON
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

export { Searchs };
