const express = require('express')
const app = module.exports = express()


var exphbs = require('express-handlebars');
const { pipeline } = require('stream');
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

app.post('/form_output', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.render('form_output', {layout : 'index', title:'form output'});
    const data = req.body
    datajson = JSON.stringify(data)
    console.log(`${datajson}`)


}
 

)

