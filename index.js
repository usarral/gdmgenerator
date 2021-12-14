const playwright = require('playwright');
const fs = require('fs');
const datos = require('./datos.json');
let juvenil_url = datos.juvenil_url + `jornada=${datos.juvenil_jornada}`
let newjson = []
let campo
let matchesstring
let localteam
let polideportivo
let position
let endposition
let endteamline
let visitteam
let local
let matches
let i = 0;

async function getdata() {
    //Create the browser and a newtab
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    const page = await browser.newPage();
    //We say to the program that discard the images
    await page.route('**/*', (route) => {
        return route.request().resourceType() === 'image' ?
            route.abort() :
            route.continue()
    });
    //Go to the page
    await page.goto(juvenil_url);
    //Get all the matches of the day
    matches = await page.$$eval('td.p-t-20', (tds) => {
        return tds.map((td) => td.textContent);
    });

    matchesstring = JSON.stringify(matches)
    matchesstring = matchesstring.substring(1, matchesstring.length - 1);
    if (matchesstring.search(`"G.D.M LA MERCED  - `) != -1) {
        local = 1;
        console.log("Juega local🏠")
    } else {
        if (matchesstring.search(`- G.D.M LA MERCED "`) != -1) {
            local = 0;
            console.log("Juega visitante🚗")
        } else {
            console.log("Este equipo no juega esta semana ❌")
        }
    }


    if (local == 1) {
        localteam = `G.D.M LA MERCED`
        polideportivo = `MIGUEL INDURAIN`
        position = matchesstring.search(`"G.D.M LA MERCED`)
        endposition = matchesstring.search(`"ACTA NO DISPONIBLE",`)
        endteamline = matchesstring.substring(position)


        endteamline = endteamline.substring(0, endposition)
        // console.log(juveniljuegalocal)

        endposition = endteamline.search(`","`)
        visitteam = endteamline.substring(20, endposition)
        // console.log(juveniljuegalocalequipovisitante) //GURPEA BETI-ONAK B
        newjson.push(`${datos.juvenil_jornada}`)
        newjson.push(`${polideportivo}`)
        newjson.push(`${localteam}`)
        newjson.push(`${visitteam}`)

    }
    if (local == 0) {
        visitteam = `G.D.M LA MERCED`
        endposition = matchesstring.search(`- G.D.M LA MERCED "`)
        equiposstringtrim = matchesstring.substring(0, endposition)
        position = equiposstringtrim.lastIndexOf(`ACTA NO DISPONIBLE","`)
        position = position + 21
        localteam = matchesstring.substring(position, endposition)
        // Get sportcenter
        position = matchesstring.search(localteam)
        
        newjson.push(`${datos.juvenil_jornada}`)
        newjson.push(`${polideportivo}`)
        newjson.push(`${localteam}`)
        newjson.push(`${visitteam}`)

    }

    browser.close();
    console.log("Juvenil")
    console.log("Jornada: " + newjson[0] + " 🏁")
    console.log("Campo: " + newjson[1] + " 🏟️")
    console.log("Local: " + newjson[2] + " 🏃")
    console.log("Visitante: " + newjson[3] + " 🏃🏽‍♂️")


}
getdata()