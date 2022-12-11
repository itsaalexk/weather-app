const fs = require("fs");
const axios = require("axios");






class Busquedas {
    historial = [];
    dbPath = "./db/database.json"

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
    async climaLugar(lat,lon){
        try{
            const instanceClima = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: {"appid" : process.env.OPEN_WEATHER,"units": "metric"}


            })
            const responseClima = await instanceClima.get();
           
            
            return {
                desc : responseClima.data.weather.description,
                min : responseClima.data.main.temp_min,
                max: responseClima.data.main.temp_max,
                temp : responseClima.data.main.temp
            }
        }
        catch(e){
            console.log(e)
        }
    }
    agregarHistorial(lugar = ""){
        if(this.historial.includes(lugar.toLowerCase())) return
        this.historial.unshift(lugar.toLowerCase())
        this.guardarDB()


    }
    guardarDB(){
        const payload = {historial: this.historial}
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }
    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath , "utf-8")
        const data = JSON.parse(info)
        this.historial = data.historial
    }


}


module.exports = Busquedas;