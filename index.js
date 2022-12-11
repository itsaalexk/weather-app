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
            
              await  busquedas.ciudad( lugar)


                console.log("info\n".blue)
                console.log("Ciudad:",lugarSel.nombre)
                console.log("Lat",lugarSel.lat)
                console.log("Long",lugarSel.lng)
                console.log("Temperatura:",)
                console.log("Mínima",)
                console.log("Máxima",)

        }

        if (opt !== 0)  await pausa();
       

    }
    while( opt !== 0)

}

main()