const axios = require("axios")



class Busquedas {
    historial = ["Valencia","Madrid"];

    constructor(){
        // Leer DB
    } 
    get paramsMapbox(){
        return {
            "language":"es",
            "limit":5,
            "access_token":"pk.eyJ1IjoiaXRzYWFsZXhrIiwiYSI6ImNsYmh5a2N4MDA0cHczbm9kZ3lkZm5kNnYifQ.puti8KM7Dz0a-ic3x0dfSQ"
        }
    }
    

    async ciudad( lugar = ""){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params : this.paramsMapbox
            });
            const resp =  await instance.get();

            console.log(resp.data)
     
           
     
             return []
        }
        catch(e){
            console.log(e)
        }

    }

}


module.exports = Busquedas;