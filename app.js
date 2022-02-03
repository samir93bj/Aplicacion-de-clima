const { leerInput, pausa, inquirerMenu } = require('./helpers/inquirer.js'); 
const Busquedas = require('./models/busqueda');

const main = async () => {

    const busquedas = new Busquedas();

   do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                //Mostrat Mensaje
                    const lugar = await leerInput("Ingrese Ciudad: ");
                    await busquedas.ciudad(lugar);
                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                /*Mostrar Resultados
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad");
                console.log("Lat");
                console.log("Lng");
                console.log("Temperatura");
                console.log("Minima");
                console.log("Maxima");*/

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