const express = require('express');
const app =module.exports = express();

const PORT = 3000;
const fs = require('fs/promises');
/** 
const car_search = require('./car_search')
const car_wishlist = require('./car_wishlist')
const form_output = require('./form_output')
app.use(car_search)
app.use(car_wishlist)
app.use(form_output)
*/
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(pipelining)

//Loads the handlebars module
var exphbs = require('express-handlebars');
const { pipeline } = require('stream');
//Sets our app to use the handlebars engine

//Sets handlebars configurations (we will go through them later on)


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



app.get('/', async(req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index', title:'Home Page' });


});


app.get('/car_search', async(req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('car_search', {layout : 'index', title: 'Car Search', data_retrieved:false});

   
})

app.post('/car_search', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
res.render('car_search', {layout : 'index', title:'Car Search',data_retrieved:false});
var formData = req.body;
var formDataJsonString = JSON.stringify(formData);
var formatDataJson = JSON.parse(formDataJsonString)
if((formDataJson.cname === "")||formDataJson.cname === false){
    console.log('No submission')
    res.send('<script>alert("you did not enter a car name"); window.location.href = "/car_search"; </script>');
    
}
else{
    
    console.log(formDataJsonString)
    fs.writeFile("microservice/Output.json",formDataJsonString)

    let request  =  XMLHttpRequest()
   await request.open("POST", 'http://localhost:8080/');
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
   await request.send(formDataJson)
    

}

// async function pipelining(req,res,formDataJson, next){
    // try{
        // fs.writeFileSync("microservice/Output.json",formDataJson)
    // }
    // catch(err){console.log(error)}

// }
app.post('/form_output', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('form_output', {layout : 'index', title:'form output'});
    const data = req.body
    datajson = JSON.stringify(data)
    console.log(`${datajson}`)


}

)



});


app.get('/car_wishlist', (req, res) => {
        //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('car_wishlist', {layout : 'index', title:'Car Wishlist'});
});

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});