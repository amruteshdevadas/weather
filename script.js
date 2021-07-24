
async function getData()
{
    refreshList();
    input = document.getElementById("search").value;

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=17e4c52973dc3f5bf3907ef3d143a881`,{
            method : 'GET'})
    object = await response.json()

    var myStatus = response.status;
   if (input && myStatus!= 404)
   {    
        
        weather = object.weather
        main = object.main
        sys = object.sys

        var outercontainer = document.createElement("div");
        outercontainer.className="outercontainer";
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

   $("#search").val("");
    document.body.append(outercontainer)
   
    }
    else
    {
    noResults();
    }
}

function refreshList()
{
   $(".outercontainer").remove();
}

function noResults()
{
    alert("Please Enter Valid City")
    $("#search").val("");
}


