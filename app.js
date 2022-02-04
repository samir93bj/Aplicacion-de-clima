const { leerInput, pausa, inquirerMenu, listado } = require('./helpers/inquirer.js'); 
const Busquedas = require('./models/busqueda');

const main = async () => {

    const busquedas = new Busquedas();

   do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                //Mostrar Mensaje
                    const termino = await leerInput("Ingrese Ciudad: ");
                
                //Buscar los lugares    
                    const lugares = await busquedas.ciudad(termino);

                //Seleccionar el lugar
                    const id = await listado(lugares);
                    const lugarSelect = lugares.find( lugar => lugar.id === id); //Devuelve el primer registro que encuentra con dichos coincidencias

                //Clima

                    const clima = await busquedas.climaLugar(lugarSelect.lat, lugarSelect.lng);

                /* Mostrar Resultados */
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad: ",lugarSelect.name);
                console.log("Lat ",lugarSelect.lat);
                console.log("Lng",lugarSelect.lng);
                console.log("Clima",clima.desc);
                console.log("Temperatura",clima.temp);
                console.log("Minima",clima.max);
                console.log("Maxima",clima.min);
 
            break;

            case 2:
                console.log('Seleccionaste la opcion 2');
            break;
        }

        await pausa();
   }
   while (opt !== 0) {
    
   }
}

main();