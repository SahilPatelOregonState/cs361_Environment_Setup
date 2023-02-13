/** 
const express = require('express')
const app = module.exports = express()


var exphbs = require('express-handlebars');

//Sets our app to use the handlebars engine

//Sets handlebars configurations (we will go through them later on)


module.exports = app.engine('.hbs', exphbs.engine({
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
module.exports = app.set('view engine', '.hbs');








app.get('/car_search', async(req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('car_search', {layout : 'index', title: 'Car Search', data_retrieved:false});

   
})

app.post('/car_search', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
res.render('car_search', {layout : 'index', title:'Car Search',data_retrieved:false});
var formData = req.body.cname;
var formDataJson = JSON.stringify(formData);
if((formData.cname === "")||formData.cname === false){
    console.log('No submission')
    res.send('<script>alert("you did not enter a car name"); window.location.href = "/car_search"; </script>');
    
}
else{
    
    console.log(formDataJson)
    fs.writeFile("C:\CS361\cs361_environment_setup\microservice\Output.json",formDataJson)

    let request  = new XMLHttpRequest()
    request.open("POST", 'http://localhost:8080/');
    // sets request header for POST
    request.setRequestHeader(
    "Content-Type", "application/json"
    );
    request.send(formDataJson)
   
}

/**async function pipelining(req,res,formDataJson, next){
    try{
        fs.writeFileSync("microservice/Output.json",formDataJson)
    }
    catch(err){console.log(error)}

}

});
*/