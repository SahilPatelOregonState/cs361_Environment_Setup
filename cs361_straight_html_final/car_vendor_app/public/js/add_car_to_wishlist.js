let add_car = document.getElementById("add-form")

add_car.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    
    let car_name = document.getElementById("carName")
    car_name_value = car_name.value

    car_description = document.getElementById("car-description")
    car_description_value = car_description.value

    car_image = document.getElementById("car-image")
    car_image_value = car_image.value

    let car_doc_data = {car_name:car_name_value, description:car_description_value, image: car_image_value}
    var xhttps = new XMLHttpRequest()

    xhttps.open("POST",'http://localhost:3000/car_addition')

    xhttps.setRequestHeader('Content-Type', 'application/json')

    xhttps.onreadystatechange =  function(){
        if (this.readyState === 4 && this.status === 200) {
            send_alert(xhttps.response)
        }
        else if (xhttps.readyState == 4 && xhttps.status != 200) {
            console.log("There was an error with the input.")
        }
    }

xhttps.send(JSON.stringify(car_doc_data))    

})


function send_alert(message_from_db_json){
    message_from_db_object = JSON.parse(message_from_db_json)
    window.alert(message_from_db_json.db_message_val)
    
    
}