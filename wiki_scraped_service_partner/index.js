const express = require('express');
const request = require('request');
const cheerio = require('cheerio')
const app = express();
const PORT = 3001;

app.use(express.json()); 
app.use(express.urlencoded()); 

// Route Handlers

// GET request handler
app.post("/", (req, res) => {
    let car = req.body.carName; // .query because it's a get request. Represents JS object.
    console.log("App Server -> Microservice: " + car);
    //let requestURL = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvslots=*&rvprop=content&formatversion=2&format=json&titles=" + car;
    let requestURL = "https://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + car;
    request(requestURL, function (error, response, body) {
        //console.log(JSON.parse(body).query.pages[0].revisions[0].slots.main.content)
        //let result = JSON.parse(body).query.pages[0].revisions[0].slots.main.content
        let err = JSON.parse(body).error;
        if (err == null) {
            // const $ = cheerio.load(body);
            // const imgSrc = $('img').attr('src');
            // console.log(imgSrc);

            let result = JSON.parse(body).parse.text["*"];
            console.log("Microservice -> App Server: " + result);
            res.send(result);
        }
    })
})

// list on defined port. Activates "app" route handlers as defined above.
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});