require('dotenv').config()
const axios = require('axios').default;

class Busquedas  {
    histrial = ['Buenos Aires','Tucuman','Cordoba','Salta'];

    constructor(){
        //TODO: Leer si existe la DB
    }

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
}

module.exports = Busquedas;