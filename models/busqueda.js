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
                    'access_token' :'pk.eyJ1Ijoic2FtaXI5M2JqIiwiYSI6ImNrejY3YXR0eDB2dmwzMHB2dGt6ZzJjNjkifQ.Q27LYUT_fQ_un3NuL2pKLw',
                    'limit':5  
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