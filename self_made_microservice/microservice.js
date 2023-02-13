const express = require('express');
const app = express();
PORT = 8080;



const fs = require('fs/promises')
const searchinput = {cname:'acura tl'}
const puppeteer = require('puppeteer');

async function wikiscrape (searchinput)  {
    const  browser = await puppeteer.launch();
    const page  = await browser.newPage();
    await page.goto('https://www.wikipedia.org/');
    await page.type("#searchInput",searchinput.cname);
    await Promise.all([await page.click("#search-form > fieldset > button"),await page.waitForNavigation()]);
    console.log('searched the page')
    const description = await page.$eval("#mw-content-text > div.mw-parser-output > p",el => el.textContent)
    
    console.log(description)
    return description
   
    await fs.writeFile("wikipage.html",description)
    
    browser.close()
    
}
//wikiscrape(searchinput)

app.post("/",(req,res)=>{
    const search_input= req.body.cname
    const result = wikiscrape(search_input)
    const resultjson = JSON.stringify(result)

    let request  = new XMLHttpRequest()
    request.open("POST", 'http://localhost:3000/form_output');
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
    request.send(resultjson)

   
   
})

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});