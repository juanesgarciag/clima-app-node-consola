import { inquirerMenu, pause, readInput } from "./helpers/inquire.js";
import { Searchs } from "./models/search.js";

const main = async () => {

    const search = new Searchs();

    let opt = '';

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
            //Mostra mensaje
            const place = await readInput('Ciudad: '); 

            //Buscar lugares
            search.city(place);

            //Seleccionar lugar

            //Clima

            //Mostrar resultados

                console.log('\n Información de la ciudad '.green);
                console.log('----------------------------\n'.green);
                console.log('Ciudad: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temperatura: ', );
                console.log('Mínima: ', );
                console.log('Máxima: ', );
                break;
            case 2:
                console.log('Aqui veremos el historial')
                break;
        
            default:
                break;
        }

        if(opt !== 0) await pause();

    }while(opt!==0);

};

main();