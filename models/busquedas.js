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
            "access_token":process.env.MAPBOX
        }
    }
    

    async ciudad( lugar = ""){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params : this.paramsMapbox
            });
            const resp =  await instance.get();
            
            
           return resp.data.features.map((lugar)=>{
                return {
                    id:lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1]
                }
            })
     
           
     
             
        }
        catch(e){
           console.log(e)
        }

    }

}


module.exports = Busquedas;