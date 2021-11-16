const playwright = require('playwright');
const fs = require('fs');
const datos = require('./datos.json');
const { createDeflate } = require('zlib');
const { TIMEOUT } = require('dns');
var newjson = []
let campo
async function juvenil() {
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    const page = await browser.newPage();

    await page.route('**/*', (route) => {
        return route.request().resourceType() === 'image'
            ? route.abort()
            : route.continue()
    });
    //JUVENIL FEM
    await page.goto(`https://www.rfebm.com/competiciones/competicion.php?seleccion=0&id_categoria=200011&id_competicion=202747&id_temp=2122&id_ambito=0&id_territorial=31&jornada=${datos.juvenil_jornada}`);
    i = 0;
    console.log("Pagina cargada 💻")
    //Pull to data all p-t-20 from the td
    const equipos = await page.$$eval('td.p-t-20', (tds) => {
        return tds.map((td) => td.textContent);
    });
    console.log("Tabla Recuperada✅")
    let equiposstring = JSON.stringify(equipos)

    equiposstring = equiposstring.substring(1, equiposstring.length - 1);
    if (equiposstring.search(`"G.D.M LA MERCED  - `) != -1) {
        campo = 1;
        console.log("Juega local🏠")
    } else {
        if (equiposstring.search(`- G.D.M LA MERCED "`) != -1) {
            campo = 0;
            console.log("Juega visitante🚗")
        } else {
            console.log("Este equipo no juega esta semana ❌")
        }
    }
    // console.warn(equiposstring)



    //     //VISITANTES
    //     let iniciolinea = 
    // //LOCALES

    if (campo == 1) {
        let equipolocaljueganlocaljuvenil = `G.D.M LA MERCED`
        let polideportivo = `MIGUEL INDURAIN`
        let position = equiposstring.search(`"G.D.M LA MERCED`)
        let lineendposition = equiposstring.search(`"ACTA NO DISPONIBLE",`)
        juveniljuegalocal = equiposstring.substring(position)


        juveniljuegalocal = juveniljuegalocal.substring(0, lineendposition)
        // console.log(juveniljuegalocal)

        let endposition = juveniljuegalocal.search(`","`)
        let juveniljuegalocalequipovisitante = juveniljuegalocal.substring(20, endposition)
        // console.log(juveniljuegalocalequipovisitante) //GURPEA BETI-ONAK B
        newjson.push(`${datos.juvenil_jornada}`)
        newjson.push(`${polideportivo}`)
        newjson.push(`${equipolocaljueganlocaljuvenil}`)
        newjson.push(`${juveniljuegalocalequipovisitante}`)

    }
    if (campo == 0) {
        let equipovisitantejueganvisitantejuvenil = `G.D.M LA MERCED`
        //OBTENER NOMBRE EQUIPO LOCAL
        let position = equiposstring.search(`- G.D.M LA MERCED "`)
        let equiposstringtrim = equiposstring.substring(0, position)
        let lineendposition = equiposstringtrim.lastIndexOf(`ACTA NO DISPONIBLE","`)
        let finposition = 21 + lineendposition
        // console.log(finposition)
        equipolocaljueganvisitantejuvenil = equiposstring.substring(finposition, position)
        // console.log(equipolocaljueganvisitantejuvenil)
        //Buscar campo del partido
        lineaequipovisitantetemp = equiposstring.substring(finposition, equiposstring.length)
        endlineaequipovistantetemp = (lineaequipovisitantetemp.search(`"ACTA NO DISPONIBLE","`)) - 80
        lineaequipovisitante = lineaequipovisitantetemp.substring(0, endlineaequipovistantetemp)
        trimpolideportivo = lineaequipovisitante.lastIndexOf(`"," - ","`) + 9
        // console.log(trimpolideportivo)
        polideportivo = lineaequipovisitante.substring(trimpolideportivo, lineaequipovisitante.length)
        // console.log(polideportivo)
        newjson.push(`${datos.juvenil_jornada}`)
        newjson.push(`${polideportivo}`)
        newjson.push(`${equipolocaljueganvisitantejuvenil}`)
        newjson.push(`${equipovisitantejueganvisitantejuvenil}`)
        
    }

    browser.close();
    console.log("Jornada: " + newjson[0] + " 🏁")
    console.log("Campo: " + newjson[1] + " 🏟️")
    console.log("Local: " + newjson[2] + " 🏃")
    console.log("Visitante: " + newjson[3] + " 🏃🏽‍♂️")
    console.info("Cadete 🏃")

}
async function cadete() {
    const browser = await playwright.chromium.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.route('**/*', (route) => {
        return route.request().resourceType() === 'image'
            ? route.abort()
            : route.continue()
    });
    //JUVENIL FEM
    await page.goto(`https://www.rfebm.com/competiciones/competicion.php?seleccion=0&id=1008603&id_ambito=0jornada=${datos.cadete_jornada}`);
    i = 0;
    browser.close();


}
console.warn("JUVENIL 🏃🏻‍♂️")
juvenil();
cadete();
