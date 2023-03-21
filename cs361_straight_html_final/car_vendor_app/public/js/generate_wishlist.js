let wishlist_form = document.getElementById("wishlist-generator-form")

wishlist_form.addEventListener("submit", (e) => {
    debugger;
    e.preventDefault()

    var xhttps = new XMLHttpRequest()

    xhttps.open("POST",'http://localhost:3000/car_wishlist')

    xhttps.setRequestHeader('Content-Type', 'application/json')

    xhttps.onreadystatechange =  function(){
        if (this.readyState === 4 && this.status === 200) {
            generate_car_profiles(xhttps.response)
        }
        else if (xhttps.readyState == 4 && xhttps.status != 200) {
            console.log("There was an error with the input.")
        }
    }

xhttps.send()    

})

function generate_car_profiles(car_profile_documents){
    
    let car_profiles_object = JSON.parse(car_profile_documents)

    for(let i=0;car_profiles_object.length;i++){

        let car_profile  = car_profiles_object[i]

        let table = document.createElement("table")
        table.setAttribute("id",`${car_profile._id}-table`)

        let thead = document.createElement("thead")
        thead.setAttribute("id",`${car_profile._id}-thead`)

        let tr_for_head = document.createElement("tr")
        tr_for_head.setAttribute("id",`${car_profile._id}-header-row`)

        let car_profiles_div = document.getElementById("car_profiles_tables")

        car_profiles_div.appendChild(table)
        table.appendChild(thead)
        thead.appendChild(tr_for_head)

        let car_prof_key_arr = Object.keys(car_profile)

        for(const car_prof_key of car_prof_key_arr){
            let tr_for_head_for_car = document.getElementById(`${car_profile._id}-header-row`)
            let th_for_head_for_car = document.createElement("th")
            th_for_head_for_car.innerHTML = car_prof_key
            

            tr_for_head_for_car.appendChild(th_for_head_for_car)
        }

        let tbody = document.createElement("tbody")
        tbody.setAttribute("id",`${car_profile._id}-tbody`)
        
        table.appendChild(tbody)
        let tbody_for_car = document.getElementById(`${car_profile._id}-tbody`)
        let tr_for_tbody = document.createElement("tr")
        table.appendChild(tr_for_tbody)
        tr_for_tbody.setAttribute("id",`${i}`)
        
        let car_prof_val_arr = Object.values(car_profile)
        let trow_for_body = document.getElementById(`${i}`)
        tbody_for_car.appendChild(trow_for_body)


        for(const car_prof_val of car_prof_val_arr ){
            let trow_for_body = document.getElementById(`${i}`)
            let td_for_trow_for_car = document.createElement("td")
            td_for_trow_for_car.innerHTML = String(car_prof_val)
            trow_for_body.appendChild(td_for_trow_for_car)
            
        }

        let td_for_csv_form = document.createElement("td")
        td_for_csv_form.setAttribute("id",`${car_profile._id}-csv-td`)
        

        let csv_form = document.createElement("form")
        csv_form.setAttribute("id",`${car_profile._id}-csv-form`)
        csv_form.setAttribute("action","/turn_to_csv")
        csv_form.setAttribute("method","POST")

        let csv_form_hidden_input = document.createElement("input")
        csv_form_hidden_input.setAttribute("id",`${car_profile._id}-csv-input`)
        csv_form_hidden_input.setAttribute("type","hidden")
        csv_form_hidden_input.setAttribute("name","car_name")
        csv_form_hidden_input.setAttribute("value",`${JSON.stringify(car_profile)}`)

        let csv_form_submit_input = document.createElement("input")
        csv_form_submit_input.setAttribute("id",`${i}-input`)
        
        csv_form_submit_input.setAttribute("type","submit")
        csv_form_submit_input.setAttribute("value","to_csv")


        // let csv_script = document.createElement("script")
        // csv_script.setAttribute("src","./js/profile_to_csv.js")

        trow_for_body.appendChild(td_for_csv_form)
        td_for_csv_form.appendChild(csv_form)
        csv_form.appendChild(csv_form_hidden_input)
        csv_form.appendChild(csv_form_submit_input)
       



        let td_for_delete_form = document.createElement("td")
        td_for_delete_form.setAttribute("id",`${car_profile._id}-delete-td`)
       

        let delete_form = document.createElement("form")
        delete_form.setAttribute("id",`${car_profile._id}-delete-form`)
        delete_form.setAttribute("action","/delete_car_profile")
        delete_form.setAttribute("method","POST")

        let delete_form_hidden_input = document.createElement("input")
        delete_form_hidden_input.setAttribute("id",`${car_profile._id}-delete-input`)
        delete_form_hidden_input.setAttribute("type","hidden")
        delete_form_hidden_input.setAttribute("name","car_id")
        delete_form_hidden_input.setAttribute("value",`${JSON.stringify(car_profile)}`)

        let delete_form_submit_input = document.createElement("input")
        delete_form_submit_input.setAttribute("id",`${i}-delete`)
        delete_form_submit_input.setAttribute("type","submit")
        delete_form_submit_input.setAttribute("value","delete")

        trow_for_body.appendChild(td_for_delete_form)
        td_for_delete_form.appendChild(delete_form)
        delete_form.appendChild(delete_form_hidden_input)
        delete_form.appendChild(delete_form_submit_input)



    
    } 
}