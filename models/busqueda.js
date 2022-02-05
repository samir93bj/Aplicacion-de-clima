const fs = require('fs'); //Utilizamos para aplicar funciones de fileServer

const axios = require('axios').default; // Axios para conexion a los EndPoint

require('dotenv').config()


class Busquedas  {

    historial = [];
    dbPath='./db/database.json';

    constructor(){
        //TODO: Leer si existe la DB
        this.leerDb();
    }

    //Capitalizar Historial
    get historialCapitalizado(){

        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        });
    }

    //FUNCION PARA OBTENER CIUDAD
    async ciudad(lugar = '') {

        try{
            //PETICION HTTPS
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    'access_token' : process.env.MAPBOX_KEY, //Utilizamos dotenv para preparar las variables de entorno
                    'limit':5,
                    'language' : 'es'  
                }
            });

            const resp = await intance.get();
            
            //Una vez que obtenemos la respuesta de la consulta, utilizamos la funcion map para recorrer el arreglo y almacenar los datos
            return resp.data.features.map(lugar => ({
                id : lugar.id,
                name : lugar.place_name,
                lng : lugar.center[0],
                lat : lugar.center[1]   
            })
            );

        }catch(e){ 
            return console.error(`${e}`);
        }
    
    }


    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }


    //FUNCION PARA OBTENER CLIMA DEL LUGAR
    async climaLugar(lat,lon){

        try{

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        }catch(e){

            console.log(`${e}`);

        }
    }

    async guardarLugar(lugar = ''){

        //Verificamos que no esten repetidos los datos
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        };

        //TODO: evitar guardado de duplicados
        this.historial.unshift(lugar.toLocaleLowerCase()); //unshift nos permite guardar al inicio del arreglo

        //Guardar en Base de Datos
        this.guardarDB();
    }

     //Grabar en DB
     guardarDB(){

        const payload = {
            historial : this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify( payload ));
    }

    //Leer DB
    async leerDb(){

        // Debe de existir...
        if( !fs.existsSync( this.dbPath) ) return;
        
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info ); //Parseamos para que vuelva a ser un JSON
    
        this.historial = data.historial;
    }
}

module.exports = Busquedas;