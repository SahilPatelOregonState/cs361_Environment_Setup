let car_search_form = document.getElementById("car-search-form")

car_search_form.addEventListener('submit', async function(e){
    debugger;
    e.preventDefault()
    carName_input = document.getElementById("car-name")

    carName_value = carName_input.value

    data = {carName:carName_value}

    var xhr = new XMLHttpRequest()

    xhr.open("POST",'http://localhost:3003/car_search')

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = async function(){
        if (this.readyState === 4 && this.status === 200) {
            car_description_paragraph(xhr.response)
        }
        else if (xhr.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

xhr.send(JSON.stringify(data))    
})

function car_description_paragraph(body_string){
    div_for_car = document.getElementById("car-description")
    const pTagPattern = /<p>(.*?)<\/p>/;
    const match = body_string.match(pTagPattern)


    if(match){
        first_match = match[1]
        second_match = match[2]
        first_paragraph = document.createElement("p")
        first_paragraph.setAttribute("id","first-p")
        first_paragraph.textContent += first_match

        second_paragraph = document.createElement("p")
        second_paragraph.setAttribute("id","second-p")
        second_paragraph.textContent += second_match
        
        div_for_car.appendChild(first_paragraph)
        div_for_car.appendChild(second_paragraph)
        
        
    }

}