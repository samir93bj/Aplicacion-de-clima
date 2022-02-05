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
                    if (id === '0') continue;
                    const lugarSelect = lugares.find( lugar => lugar.id === id); //Devuelve el primer registro que encuentra con dichos coincidencias


                //Guardar en DB 
                busquedas.guardarLugar(lugarSelect.name);
                    
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
                busquedas.historial.forEach((lugar,i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(` ${idx} ${lugar} `);
                });

            break;
        }

        await pausa();
   }
   while (opt !== 0) {
    
   }
}

main();