const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs/promises');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
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

app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});

app.get('/', async(req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index', title:'Home Page' });


});


app.get('/car_search', async(req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('car_search', {layout : 'index', title: 'Car Search', data_retrieved:true});

   
})

app.post('/car_search', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
res.render('car_search', {layout : 'index', title:'Car Search',data_retrieved:true});
var formData = req.body;
var formDataJson = JSON.stringify(formData);
if(formData.cname === ""){
    console.log('No submission')
    res.send('<script>alert("you did not enter a car name"); window.location.href = "/car_search"; </script>');
    
}
else{
    
    console.log(formDataJson)
    fs.writeFile("microservice/Output.json",formDataJson)

    
    

}

/**async function pipelining(req,res,formDataJson, next){
    try{
        fs.writeFileSync("microservice/Output.json",formDataJson)
    }
    catch(err){console.log(error)}

}*/



});


app.get('/car_wishlist', (req, res) => {
        //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('car_wishlist', {layout : 'index', title:'Car Wishlist'});
});
