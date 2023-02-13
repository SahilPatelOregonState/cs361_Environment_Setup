const fs = require('fs/promises')
const http =require('http')
const axios =require('axios') //AXIOS WAS USED FOR FETCHES
const express = require('express');
const app = express();
PORT = 3001;
route_to = 'localhost:3000/'
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(mwareJsObjectArrToCSVFormat(req,res,next))
// app.use(route_to)


app.post('/receive-data',(req,res)=>{
  items = req.body
  var objArr = JSON.stringify(items)

  const arr = typeof objectArr !== 'object' ? JSON.parse(objArr) : objArr;
   let csv_str = `${Object.keys(arr[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

  final_csv = arr.reduce((csv_str,next_str)=>{
      csv_str += `${Object.values(next_str).map(value =>`${value}`).join(",") +'\r\n'}`; return csv_str
  },csv_str)



  const res_data = {data :final_csv}

  
   
   
  res.send(res_data.data)

})



    

app.listen(PORT,() =>{console.log(`listening on ${PORT}`)})

// THIS FUNCTION TAKES IN AN ARRAY THAT CONTAINS THE JS_OBJECT AND RETURNS THE CSV STRING
/**  
function jsObjectArrToCSVFormat(objArr){
  const arr = typeof objectArr !== 'object' ? JSON.parse(objArr) : objArr;
   let csv_str = `${Object.keys(arr[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
  return arr.reduce((csv_str,next_str)=>{
      csv_str += `${Object.values(next_str).map(value =>`${value}`).join(",") +'\r\n'}`; return str
  },csv_str)
}
*/
/** 
 //THIS IS THE MIDDLEWARE VERSION OF THE PREVIOUS FUNCITON
function mwareJsObjectArrToCSVFormat(req,res,next){
  objArr = req.body.data
  const arr = typeof objectArr !== 'object' ? JSON.parse(objArr) : objArr;
   let csv_str = `${Object.keys(arr[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
  final_csv = arr.reduce((csv_str,next_str)=>{
      csv_str += `${Object.values(next_str).map(value =>`${value}`).join(",") +'\r\n'}`; return csv_str
  },csv_str)

  const res_data = {data : final_csv}
  next()
}
*/




//BELOW IS USELESS CODE 
/** 
function jsobject_to_csv_post(route, jsObjArr) {
  // creates new XMLHttpRequest and sets to variable
  let objArrToCSV = jsObjectArrToCSVFormat(jsObjArr)
  let request = new XMLHttpRequest();       
  // opens request variable as a POST request and defines the route
  request.open("POST", route);
  // sets request header for POST
  request.setRequestHeader(
  "Content-Type", "application/json"
  );
  request.send(objArrToCSV)
  }
*/
 
//app.use(jsObjectArrToCSVFormat())
// app.use(jsobject_to_csv_post())

// var objArr = req.body.jsObjArr

  // jsobject_to_csv_post(route_to, objArr)
  /** 
  var options = {
    host: 'localhost',
    port: 3000,
    path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};
var httprequest = http.request(options, function (response) {
  response.setEncoding('utf8');
  response.on('data', function (chunk) {

})
*/
