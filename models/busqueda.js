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
                    'access_token' : process.env.MAPBOX_KEY,
                    'limit':5,
                    'language' : 'es'  
                }
            });

            const resp = await intance.get();
            console.log(resp.data);

        }catch(e){ 
            return console.error(`${e}`);
        }
    
    }
}

module.exports = Busquedas;