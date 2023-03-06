
let car_search_form = document.getElementById("car-search-form")

car_search_form.addEventListener('submit', async function(e){
    debugger;
    e.preventDefault()
    carName_input = document.getElementById("car-name")

    carName_value = carName_input.value

    data = {carName:carName_value}

    var xhr = new XMLHttpRequest()

    xhr.open("POST",'http://localhost:3000/car_searcher')

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange =  function(){
        if (this.readyState === 4 && this.status === 200) {
            car_description_paragraph(xhr.response)
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            console.log("There was an error with the input.")
        }
    }

xhr.send(JSON.stringify(data))    
})

function car_description_paragraph(profile){
    debugger;
    profile_parsed = JSON.parse(profile)
    div_for_car = document.getElementById("car-description")
    const pTagPattern = /<p>(.*?)<\/p>/;
    const match = profile_parsed.body_string.match(pTagPattern)


    if(match){
        let first_match = match[0]
        second_match = match[1]
       let first_paragraph = document.createElement("p")
        first_paragraph.setAttribute("id","first-p")
        first_paragraph.innerHTML = first_match

        
       

        // second_paragraph = document.createElement("p")
        // second_paragraph.setAttribute("id","second-p")
        // second_paragraph.innerHTML = second_match
        
        div_for_car.appendChild(first_paragraph)
        let description_tag = document.getElementById("first-p")

        let description_value = description_tag.innerText

        let add_form  = document.createElement("form")
        let input_hidden = document.createElement("input")
        input_hidden.setAttribute("type","hidden")
        input_hidden.setAttribute("name", "car_profile")
        input_hidden.setAttribute("value", JSON.stringify({description:description_value}))
        
        // div_for_car.appendChild(second_paragraph)
        
        
    }

}