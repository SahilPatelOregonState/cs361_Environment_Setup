// const http =require('http')
const fs = require('fs/promises')
const axios = require('axios')
const express = require('express');
// const { response } = require('express');
const app = express();
PORT = 3000;
// route_to = 'localhost:3001/'
// route_from ='https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(send_objarr())
// app.use(items)
// app.use(route_to)
// app.use(route_from)
// app.use(XMLHttpRequest())

var items = [
     { name: "Item 1", color: "Green", size: "X-Large" },
     { name: "Item 2", color: "White", size: "normal" },
     { name: "Item 3", color: "Orange", size: "small" }];



app.get('/send-data',async(req,res)=>{

    try{
        let response = await axios.post('http://localhost:3001/receive-data', items)

        
        console.log(`${response.data}`)
    
        fs.writeFile('test_csv.csv',response.data,(err)=>{
            if (err){console.log(err);}
    
            else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            }
        })
        //res.send('<a href = "/test_csv.csv" download>test_csv</a>')
        res.send(response.data)
    
    
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Error sending data to server 2')
      }
})
   
app.listen(PORT,() =>{console.log(`listening on ${PORT}`)})


//BELOW IS USELESS CODE 
/** 
function get_objarr(route, jsObjArr) {
    // creates new XMLHttpRequest and sets to variable
    
    let request = new XMLHttpRequest();       
    // opens request variable as a POST request and defines the route
    request.open("GET", route);
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
    
    }*/
/**function send_objarr(route, jsObjArr) {
    // creates new XMLHttpRequest and sets to variable
    
    let request = new XMLHttpRequest();       
    // opens request variable as a POST request and defines the route
    request.open("POST", route);
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
    request.send(jsObjArr)

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
                console.log(`I got the csv return`)
            }
    if (request.readyState === 4 &&request.status === 500){
    alert("Error!")
    };
    }
}*/

/**  let request = new XMLHttpRequest();       
    // opens request variable as a POST request and defines the route
    request.open("GET", route_to);
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
        request.send(items)

    
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
                console.log(`I got the csv return`)
            }
    if (request.readyState === 4 &&request.status === 500){
    alert("Error!")
    };
    
}}) */  