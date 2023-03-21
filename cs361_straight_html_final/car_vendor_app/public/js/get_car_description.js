

let car_search_form = document.getElementById("car-search-form")

car_search_form.addEventListener('submit', async function(e){
    debugger;
    e.preventDefault()
    carName_input = document.getElementById("car-name")

    carName_value = carName_input.value
    
      if (carName_value===""){
        alert("Please enter a car value")
        
    }


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
   let profile_parsed = JSON.parse(profile)

   let car_name = profile_parsed.car_name



  let div_for_car = document.getElementById("car-profile")
    const pTagPattern = /<p>(.*?)<\/p>/;
    const match = profile_parsed.body_string.match(pTagPattern)

    // let image_switch_form  =document.createElement("form")
    // image_switch_form.setAttribute("id","image-changer")


    let car_img = document.createElement("img")
    car_img.setAttribute("id","car_img")
    car_img.setAttribute("src", profile_parsed.car_images[0]) 
    car_img.setAttribute("width","200")
    car_img.setAttribute("height","200")
    div_for_car.appendChild(car_img)

    if(match){
        let first_match = match[0]
        second_match = match[1]
        let first_paragraph = document.createElement("p")
        first_paragraph.setAttribute("id","first-p")
        first_paragraph.innerHTML = first_match
        
       


       
        div_for_car.appendChild(first_paragraph)

        
  
    }
    else{

        let description_form  = document.createElement("form")
        description_form.setAttribute("id","description-form")

        let description_text_input = document.createElement("input")
        description_text_input.setAttribute("id","first-p")
        description_text_input.setAttribute("type","text")
        description_text_input.setAttribute("name","description")
        
        

        let set_description = document.createElement("input")
        set_description.setAttribute("id","set-description")
        set_description.setAttribute("type","submit")
        set_description.setAttribute("value", "set description")

        div_for_car.appendChild(description_form)
        description_form.appendChild(description_text_input)
        description_form.appendChild(set_description)

       let df = document.getElementById("description-form")
        df.addEventListener("submit", async function(e){
            e.preventDefault()
            let description_input = document.getElementById("first-p")

            let descriptionFromForm = description_input.value
            let first_paragraph = document.createElement("p")
            first_paragraph.setAttribute("id","first-p")
            first_paragraph.innerHTML = descriptionFromForm

            while (description_form.firstChild) {
                description_form.removeChild(description_form.firstChild);
              }
            description_form.parentNode.removeChild(description_form)

            div_for_car.appendChild(first_paragraph)
            


        })

    }
    let description_tag = document.getElementById("first-p")
    let description_value = description_tag.innerText

    let img_tag = document.getElementById("car_img")
    let img_file = img_tag.getAttribute("src")

    let add_form  = document.createElement("form")
    add_form.setAttribute("id","add-form")
    add_form.setAttribute("action","/car_addition")
    add_form.setAttribute("method","POST")

    let input_carname_hidden =  document.createElement("input")
    input_carname_hidden.setAttribute("id", "carName")
    input_carname_hidden.setAttribute("type","hidden")
    input_carname_hidden.setAttribute("name","car_name")
    input_carname_hidden.setAttribute("value",car_name)

    let input_descr_hidden = document.createElement("input")
    input_descr_hidden.setAttribute("id","car-description")
    input_descr_hidden.setAttribute("type","hidden")
    input_descr_hidden.setAttribute("name", "car_description")
    input_descr_hidden.setAttribute("value", description_value)

    let input_img_hidden =  document.createElement("input")
    input_img_hidden.setAttribute("id", "car-image")
    input_img_hidden.setAttribute("type","hidden")
    input_img_hidden.setAttribute("name", "car_image")
    input_img_hidden.setAttribute("value", img_file)


    let input_add = document.createElement("input")
    input_add.setAttribute("type","submit")
    input_add.setAttribute("value", "add")

    div_for_car.appendChild(add_form)
   let car_profile_form = document.getElementById("add-form")
    car_profile_form.appendChild(input_carname_hidden)
    car_profile_form.appendChild(input_img_hidden)
    car_profile_form.appendChild(input_descr_hidden)
    car_profile_form.appendChild(input_add)

    // let add_script= document.createElement("script")
    //  add_script.setAttribute("src","./js/add_car_to_wishlist.js")
    //  div_for_car.appendChild(add_script)





}