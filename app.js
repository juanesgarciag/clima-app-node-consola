import {
  inquirerMenu,
  listPlaces,
  pause,
  readInput,
} from "./helpers/inquire.js";
import { Searchs } from "./models/search.js";

const main = async () => {
  const search = new Searchs();

  let opt = "";

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostra mensaje
        const place = await readInput("Ciudad: ");

        //Buscar lugares
        const places = await search.city(place);

        //Seleccionar lugar
        const id = await listPlaces(places);
        if(id === '0') continue;

        const {name, lat, lng} = places.find(l => l.id === id);

        //Guardar en DB
        search.pushHistory(name);

        //Clima
        const infoWeather = await search.weather(lat, lng);

        //Mostrar resultados

        console.log("\n Información de la ciudad ".green);
        console.log("----------------------------\n".green);
        console.log("Ciudad:", name.green);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura:", `${infoWeather.temp} °`.yellow);
        console.log("Mínima:", `${infoWeather.min} °`.yellow);
        console.log("Máxima:", `${infoWeather.max} °`.yellow);
        console.log("Como esta el clima:", `${infoWeather.desc}`.green);
        break;
      case 2:
        search.capitalizationHistory.forEach( (place, i) => {
            const idx = `${i + 1}.`.green;
            console.log(`${idx} ${place}`);
        })
        break;

      default:
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
