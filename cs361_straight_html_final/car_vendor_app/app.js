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
const https = require('https')
const imageSearch = require('image-search-google');
const { resolve } = require('path');
const { rejects } = require('assert');
const { waitForDebugger } = require('inspector');
const car_profile = require("./database/schema")
const db_string = 'mongodb+srv://test:test@cluster0.saetfn5.mongodb.net/carprofiles_db?retryWrites=true&w=majority'
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
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
// debugger;
// var formData =req.body
// var carName = req.body.carName;
//var formDataJsonString = JSON.stringify(formData);
console.log(req.body)
let car_name = req.body.carName 

if((req.body.carName === "")||(req.body.carName === null)){
    console.log('No submission')
    res.redirect('/car_search');
    
}


else{
    
    let response = await axios.post('http://localhost:3002',req.body)
    let result = JSON.stringify(response.data)
    let  body_string_value = result


    
    /**
    endpoint = 'https://api.bing.microsoft.com/'
    let searchTerm = car_name
    let count = 3
    let url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${searchTerm}&count=${count}`
 */
    let subscriptionKey = '051478f6e7854a50a4e3005c2e5552dc';
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/images/search';
    let term = car_name;

    let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(term),
        headers : {
        'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };
    
    async function get_images(term){

        let request_params = {
            method : 'GET',
            hostname : host,
            path : path + '?q=' + encodeURIComponent(term),
            headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
            }
        };
        return new Promise((resolve, reject) => {

            const requester = https.request(request_params, function response_handler(response){
                let body = '';
                response.on('data', function (d) {
                    body += d;
                })
                response.on('end', function () {
                    let imageResults = JSON.parse(body)
                    let firstImageResult = imageResults.value[0];
                    let imageResultsValues = imageResults.value
                    resolve(imageResultsValues)
                })
                response.on('error', (err) => {
                    reject(err);
                })
            
               
            })
            requester.end()
        }

    )}
    async function main(car_name, body_string_value) {
        try{      
        const car_image_result = await get_images(car_name);
        let contentUrls = car_image_result.map(image_value =>image_value.contentUrl).filter(contenturl =>contenturl.endsWith("jpg"))
        console.log(contentUrls);

        
        let data = JSON.stringify({car_name:car_name,body_string:body_string_value , car_images:contentUrls})

        res.send(data)
        }catch(err){
            throw err
        }
        

      }

   main(car_name , body_string_value)

    }
})

app.post('/car_addition',async(req,res)=>{
    
   await mongoose.connect(db_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB', error);
      })


    let data = req.body

    let car_name_val = data.car_name

    let description_val = data.car_description

    let image_val = data.car_image

    const newDocument = new car_profile({car_name:String(car_name_val), description:String(description_val), image: String(image_val)})
 
      let db_message_val= await newDocument.save((err, result) => {
        if (err) {
          console.error(err);
          console.error('Error saving car profile:', err);
        //  let  error_str = 'error in saving'
        //   return error_str
        } else {
            console.log('Saved car profile:', result);
          console.log('Document saved successfully!');

        
        //   let success_str = 'Document saved successfully!'
        //   return success_str

        res.redirect('/car_wishlist')
        }
    })
    
   
    
})


app.get('/car_wishlist', async(req, res) => {
    //Serves the body of the page aka "car_wishlist.handlebars" to the container //aka "index.handlebars"
    res.sendFile('car_wishlist.html', {root:'static'})
});

app.post('/car_wishlist', async(req,res)=>{
    
    await mongoose.connect(db_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB', error);
      })
   
      try {
        const documents = await car_profile.find().exec();
        console.log(documents);
        let car_profiles_documents = documents
        res.send(car_profiles_documents)
      } catch (err) {
        console.error(err);
      }

     
   
    

    

})



app.post('/delete_car_profile',async(req,res)=>{
    
    let car_prof = req.body.car_id
    let car_prof_parsed = JSON.parse(car_prof)
    
    await mongoose.connect(db_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB', error);
      })
   
    try{
    await car_profile.deleteOne({_id:car_prof_parsed._id})
    console.log(`the ${removedDoc} was removed`)
    res.redirect('/car_wishlist')
    }catch(err){
        console.log(err)
        res.redirect('/car_wishlist')

    }
        

   

})
app.post('/turn_to_csv',async(req,res)=>{
    
    
    async function jsObjectArrToCSVFormat(objArr){
        const arr = objArr
         let csv_str = `${Object.keys(arr[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
        return arr.reduce((csv_str,next_str)=>{
            csv_str += `${Object.values(next_str).map(value =>`${value}`).join(",") +'\r\n'}`; return csv_str
        },csv_str)
      }


    let car_profile = req.body.car_name
    let car_profile_parsed = JSON.parse(car_profile)

    let car_profile_obj_arr = [car_profile_parsed]

    let car_profile_csv_str = await jsObjectArrToCSVFormat(car_profile_obj_arr)

    await fs.writeFile(`./car_csv_folder/${car_profile_parsed.car_name}.csv`,car_profile_csv_str)

    res.redirect('/car_wishlist')

    


})






app.listen(PORT,()=>{console.log(`Listening on port ${PORT}`)});