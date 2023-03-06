const express = require('express');
const request = require('request');
const cheerio = require('cheerio')
const axios = require('axios')
const app = express();
const PORT = 3002;
// const argsv = require('yargs').argv;
app.use(express.json()); 
app.use(express.urlencoded()); 



// GET request handler
app.post("/", (req, res) => {
    let car = req.body.carName; // .query because it's a get request. Represents JS object.
    console.log("App Server -> Microservice: " + car);
    
    
    let requestURL = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + car;
    request(requestURL, async function (error, response, body) {
        //console.log(JSON.parse(body).query.pages[0].revisions[0].slots.main.content)
        //let result = JSON.parse(body).query.pages[0].revisions[0].slots.main.content
        let err = JSON.parse(body).error;
        if (err == null) {

           
            
            let result = JSON.parse(body).parse.text["*"];
            // description = []
            // const $ = await cheerio.load(body);
            // $("#mw-content-text > div.mw-parser-output > p:nth-child(6)").each((i,e) =>{
                // description.push($(e).text().trim())
            // })
            

            
           
            console.log(`Microservice -> App Server: ` + result   );
            res.send(result);
        }
    })
})

// list on defined port. Activates "app" route handlers as defined above.
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});


//let requestURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&formatversion=2&format=json&titles=" + car;
// const $ = cheerio.load(body);
            // const imgSrc = $('img').attr('src');
            // console.log(imgSrc);

            // const firstParagraph = $('p').first().text();
            // console.log(firstParagraph);
