const express = require('express');
const app = express()
const axios = require('axios')
const PORT = 3003;
const fs = require('fs/promises');
const jsdom = require('jsdom')
const {JSDOM} = jsdom
const handlebars = require('handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));
const { engine } = require('express-handlebars')
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

/**
var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({
layoutsDir: __dirname + '/views/layouts',
defaultLayout: 'index',
extname:'.hbs',
partialsDir: __dirname + '/views/partials',

helpers:{
    CarSearchWriteFile : async (value, options) =>{
         fs.writeFile('Output.txt',value,(err)=>{
            
            if ((err) || (value ==='')) throw err;

         } )
    },
}

}));
app.set('view engine', '.hbs');

 */

app.get('/', async(req, res) => {
    
    res.render('homepage', {layout : 'main', title:'Home Page' });


});


app.get('/car_search', async(req, res) => {
    
    res.render('car_search', {layout : 'main', title: 'Car Search', data_retrieved:false});

   
})

app.post('/car_search', async(req, res) => {
   

var formData = req.body;
var formDataJsonString = JSON.stringify(formData);
console.log(formDataJsonString)
 

if((formData.carName === "")||formData.carName === false){
    console.log('No submission')
    res.send('<script>alert("you did not enter a car name"); window.location.href = "/car_search"; </script>');
    
}


else{
    
    try{
        let response = await axios.post('http://localhost:3001',formData)
        let result = JSON.stringify(response.data) 
        xhr = new XMLHttpRequest()
        xhr.open()

    }catch(error){
        console.log(error.response.data.error)
        return res.status(401).send(err.message)

    }

    
    
    
    // console.log(JSON.stringify(response.data))
    


   res.render('car_search', {layout : 'index', title: 'Car Search', data_retrieved:true, result:result})



      

}})



app.post('/form_output', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('form_output', {layout : 'main', title:'form output'});
    const data = req.body
    datajson = JSON.stringify(data)
    console.log(`${datajson}`)


}

)





app.get('/car_wishlist', (req, res) => {
        //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('car_wishlist', {layout : 'main', title:'Car Wishlist'});
});

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});