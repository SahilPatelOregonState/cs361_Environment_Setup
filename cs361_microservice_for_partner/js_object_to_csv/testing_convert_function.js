const fs = require('fs/promises')

//you must json.stringify the array i.e. JSON.stringify([{data:value}])
function jsObjectArrToCSVFormat(objArr){
    const arr = typeof objectArr !== 'object' ? JSON.parse(objArr) : objArr;
     let csv_str = `${Object.keys(arr[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
    return arr.reduce((csv_str,next_str)=>{
        csv_str += `${Object.values(next_str).map(value =>`${value}`).join(",") +'\r\n'}`; return csv_str
    },csv_str)
  }

var items = [
    { name: "Item 1", color: "Green", size: "X-Large" },
    { name: "Item 2", color: "White", size: "normal" },
    { name: "Item 3", color: "Orange", size: "small" }];

var jsonObject = JSON.stringify(items)
let csv_items = jsObjectArrToCSVFormat(jsonObject)

fs.writeFile('test_csv.csv',csv_items,(err)=>{
    if (err){console.log(err);}

else {
console.log("File written successfully\n");
console.log("The written has the following contents:");
}
})