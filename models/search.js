import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config()

const MAPBOX_KEY = process.env.MAPBOX_KEY;

class Searchs {

    historial = ['Medellín', 'New York', 'England']

    constructor(){
        //Leer DB si existe
    }

    get paramsMapbox (){
        return {
            'access_token': `${MAPBOX_KEY}`,
            'language': 'es',
            'limit': 5
        }
    }

    async city (place = ''){

        try {
            //peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();
            console.log(resp.data);
            
            return [];
        } catch (error) {
            return [];
        }

        return [];  //Retorna arreglo de ciudades
    }
}

export {Searchs};