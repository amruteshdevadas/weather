// function is called when the search button is clicked
async function getData()
{
    //to remove the existing results
    refreshList();
    //the string entered by user
    input = document.getElementById("search").value;

    //fetch request
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=17e4c52973dc3f5bf3907ef3d143a881`,{
            method : 'GET'})
    object = await response.json()
//to check wheteher there is any input and the response staus code is not 404
    var myStatus = response.status;
   if (input && myStatus!= 404)
   {    
        
        weather = object.weather
        main = object.main
        sys = object.sys

//to hold the container 
        var outercontainer = document.createElement("div");
        outercontainer.className="outercontainer";

        //array traversal to the details to render 
        //temperature has been converted into Celcius
        weather.forEach(element => {

        let container = document.createElement("div")
        container.className = "container";
        container.innerHTML=`
        <h1> Weather : ${element.main} </h1>
        <h1> Temperature : ${(main.temp-273.15).toFixed(1)}<sup>o</sup> C</h1>
        <h1> Pressure : ${main.pressure} hPa </h1>
        <h2> Humidity : ${main.humidity} % </h2>
        <h2> Max Temp : ${(main.temp_max-273.15).toFixed(1)}<sup>o</sup> C </h2>
        <h2> Min Temp : ${(main.temp_min-273.15).toFixed(1)}<sup>o</sup> C </h2>
       `
       outercontainer.append(container);  
    });
//once the render is done clear the search value
   $("#search").val("");
   //appending the outercontainer to body
    document.body.append(outercontainer)
   
    }
    //if the value is 404 and input value is an empty string the call the noResults function
    else
    {
    noResults();
    }
}
//function to referesh the list
function refreshList()
{
   $(".outercontainer").remove();
}

// function to pop an alert if there is any error

function noResults()
{
    alert("Please Enter Valid City")
    $("#search").val("");
}


