const express = require('express');
const app = express();
const puppeteer = require('puppeteer')
PORT = 8080;
app.use(express.json()); 
app.use(express.urlencoded()); 





async function wikiscrape (searchinput)  {
    const  browser = await puppeteer.launch();
    const page  = await browser.newPage();
    await page.goto('https://www.wikipedia.org/');
    await page.type("#searchInput",searchinput);
    await Promise.all([await page.click("#search-form > fieldset > button"),await page.waitForNavigation()]);
    console.log('searched the page')
    const description = await page.$eval("#mw-content-text > div.mw-parser-output > p",el => el.textContent)
    
    console.log(description)
    return description
   
   
    
    browser.close()
    
}
//wikiscrape(searchinput)

app.post("/",async(req,res)=>{
    const search_input= req.body.carName
    const result = await wikiscrape(search_input)
    const resultjson = JSON.stringify(result)
    console.log(resultjson)

    res.send(resultjson)

   
   
})

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});