const express = require('express');
const app =  express();
const axios = require('axios')

const fs = require('fs/promises');
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const handlebars = require('handlebars')
const path = require('path');
const { writeFile } = require('fs');
const router = express.Router()



app.use(express.static(__dirname + '/public'));
app.use(express.static('static'))
/** 
const car_search = require('./car_search')
const car_wishlist = require('./car_wishlist')
const form_output = require('./form_output')
app.use(car_search)
app.use(car_wishlist)
app.use(form_output)
*/

 app.use('/',router)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 3000;

//app.use(pipelining)

//Loads the handlebars module


app.get('/', async(req, res) => {
    
    res.sendFile('index.html', {root:'static'});


});


app.get('/car_search', async(req, res) => {
    
    res.sendFile('car_search.html', {root:'static'})

   
})

app.post('/car_searcher', async(req, res) => {
   
// var formData =req.body
// var carName = req.body.carName;
//var formDataJsonString = JSON.stringify(formData);
console.log(req.body)
 

if((req.body.carName === "")||(req.body.carName === null)){
    console.log('No submission')
    res.send('<script>alert("you did not enter a car name"); window.location.href = "/car_search"; </script>');
    
}


else{
    
   

    let response = await axios.post('http://localhost:3002',req.body)
    let result = JSON.stringify(response.data)
    data = {body_string:result}
    // console.log(result)  

   
      
     

   
    res.send(JSON.stringify(data));
  
   

}
})

router.get('/car_wishlist', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.sendFile('car_wishlist.html', {root:'static'})
});



router.post('/form_output', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('form_output', {layout : 'index', title:'form output'});
    const data = req.body
    datajson = JSON.stringify(data)
    console.log(`${datajson}`)


})









app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});