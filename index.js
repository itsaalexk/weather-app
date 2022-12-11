require('dotenv').config()
const {leerInput, inquirerMenu, pausa, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async()=>{
    const busquedas = new Busquedas()

    let opt;
    do {
        opt =  await inquirerMenu();
        
        switch (opt){
            case 1 :

            const lugar = await leerInput("Ciudad: ");
            const lugares = await busquedas.ciudad(lugar)
            const id = await listarLugares(lugares);
            
            const lugarSel = lugares.find(l => l.id === id)
            busquedas.agregarHistorial(lugarSel.nombre)
            const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng)
            
            
              await  busquedas.ciudad( lugar)


                console.log("info\n".blue)
                console.log("Ciudad:",lugarSel.nombre)
                console.log("Lat",lugarSel.lat)
                console.log("Long",lugarSel.lng)
                console.log("Temperatura:",clima.temp ,"ºC")
                console.log("Mínima",clima.min,"ºC")
                console.log("Máxima",clima.max,"ºC")
            
            case 2 :
                busquedas.historial.forEach((lugar , i) =>{
                    const idx = `${i+1}`.green
                    console.log(`${idx}. ${lugar}`);
                })


        }

        if (opt !== 0)  await pausa();
       

    }
    while( opt !== 0)

}

main()