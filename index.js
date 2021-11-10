const playwright = require('playwright');
const fs = require('fs');
const datos = require('./datos.json');
async function getmatches() {
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    const page = await browser.newPage();


    //JUVENIL FEM
    await page.goto(`https://www.rfebm.com/competiciones/competicion.php?seleccion=0&id_categoria=200011&id_competicion=202747&id_temp=2122&id_ambito=0&id_territorial=31&jornada=${datos.juvenil_jornada}`);
    i = 0;
    juvenilfemenino = [];

    //Pull to data all p-t-20 from the td
    const equipos = await page.$$eval('td.p-t-20', (tds) => {
        return tds.map((td) => td.textContent);
    });
    juveniljuegalocal = JSON.stringify(equipos)
    //LOCALES
    position =juveniljuegalocal.search(`"G.D.M LA MERCED`)
    endposition = juveniljuegalocal.search(`"ACTA NO DISPONIBLE",`)
    juveniljuegalocal = juveniljuegalocal.substring(position)
    juveniljuegalocal = juveniljuegalocal.substring(0, endposition)
    console.log(juveniljuegalocal)
    //FALTA FORMATEAR EL STRING
    browser.close();
}
getmatches()