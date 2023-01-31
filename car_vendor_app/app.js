const express = require('express');
const app = express();
PORT = 3000;


//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
layoutsDir: __dirname + '/views/layouts',
defaultLayout: 'index',
extname:'hbs',
partialsDir: __dirname + '/views/partials'

}));

app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index'});
    });