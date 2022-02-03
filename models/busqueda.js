const axios = require('axios').default;

class Busquedas  {
    histrial = ['Buenos Aires','Tucuman','Cordoba','Salta'];

    constructor(){
        //TODO: Leer si existe la DB
    }

    async ciudad(lugar = '') {

        try{
            const resp = await axios.get('https://reqres.in/api/users');
            console.log(resp.data.data[1].email);

            return [];
        }catch(e){
            return[];
        }
    
    }
}

module.exports = Busquedas;