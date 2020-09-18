var cityZipInputEl = document.querySelector("#cityZip");
var userSearch = []; 
var zip = 1; 
var mostRecentSearch ;

$(document).ready(function() {
    getStoredSearch();
    if(userSearch.length !== 0){
        mostRecentSearch = userSearch[0];
        getForecastRecent();
    }

    $('.aaf').on("click",function(){
        var usersid =  $(this);
        mostRecentSearch = usersid[0].text;
        getForecastRecent();
    })
});
function myFunctionElt(t){
    var usersid =  t;
    mostRecentSearch = usersid.textContent;
    getForecastRecent();
}

function getForecastRecent() {
    
    var cityZipInput = mostRecentSearch
    var APIKey = "&appid=218fcfa71868ebd1367879a676a451a5"
    var corQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityZipInput +",us" + APIKey;

    $.ajax({
      url: corQueryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      if (zip === 2){
        var cityLatLoc = response.city.coord.lat;
        var cityLonLoc = response.city.coord.lon;
        var forQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatLoc + "&lon=" + cityLonLoc + "&exclude=hourly,minutely&units=imperial" + APIKey;  
      }else{
        var cityLatLoc = response.coord.lat;
        var cityLonLoc = response.coord.lon;
        var forQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatLoc + "&lon=" + cityLonLoc + "&exclude=hourly,minutely&units=imperial" + APIKey;  
      }


    $.getJSON( forQueryURL, function( data ) {
        console.log(data);
        displayWeather(data, response);
    });

    })
    .catch((error) => {
        console.log(error)
    });
}

function getForecast() {
    

    event.preventDefault();
    var cityZipInput = cityZipInputEl.value;
    var APIKey = "&appid=218fcfa71868ebd1367879a676a451a5"
    var corQueryURL;
    var r = typeof parseInt(cityZipInput);
    var t = Number.isNaN(parseInt(cityZipInput));
    
    if (typeof parseInt(cityZipInput) === 'number' && Number.isNaN(parseInt(cityZipInput)) === false){
        zip = 2; 
        corQueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip="+ cityZipInput.trim() +",us" + APIKey;
    }else{
        corQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityZipInput.trim() +",us" + APIKey;
    }

    $.ajax({
      url: corQueryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      if (zip === 2){
        var cityLatLoc = response.city.coord.lat;
        var cityLonLoc = response.city.coord.lon;
        var forQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatLoc + "&lon=" + cityLonLoc + "&exclude=hourly,minutely&units=imperial" + APIKey;  
      }else{
        var cityLatLoc = response.coord.lat;
        var cityLonLoc = response.coord.lon;
        var forQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatLoc + "&lon=" + cityLonLoc + "&exclude=hourly,minutely&units=imperial" + APIKey;  
      }


    $.getJSON( forQueryURL, function( data ) {
        console.log(data);
        displayWeather(data, response);
    });

    })
    .catch((error) => {
        console.log(error)
    });
}

function displayWeather(data, response){
    if (zip === 2){
        $(".cityName").text(response.city.name);
        if(userSearch.includes(response.city.name) === false){
            userSearch.unshift(response.city.name);
            storeUserSearch();
            recentSearch();
        }
    }else{
        $(".cityName").text(response.name);
        if(userSearch.includes(response.name) === false){
            userSearch.unshift(response.name);
            storeUserSearch();
            recentSearch();
        }
    }
    var dateCur = new Date(data.current.dt * 1000);
    var stringDateCur = dateCur.toString();  
    var resDateCur = stringDateCur.split(" ");
    $(".dayOfWeek").text(dateCur.toLocaleString("default", { weekday: "long" }));
    $(".date").text(resDateCur[1] + ' ' + resDateCur[2] + ' ' + resDateCur[3]);
    $(".currentTemp").text(Math.round(data.current.temp)+"˚F");
    $(".currentImg").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
    $(".currentTempFeel").text("Feels like " + Math.round(data.current.feels_like) + "˚" + " F");
    $(".currentWeatherCond").text("Condition : " + data.current.weather[0].description);
    $(".currentWeatherHumd").text("Humditiy : " + data.current.humidity + "%");
    $(".currentWeatherSpeed").text("Wind Speed : " + data.current.wind_speed + "MPH");
    $(".currentWeatheruvi").text("UV Index : " + data.current.uvi);
 
    var pieColor 
    if(parseInt(data.current.uvi) <= 2){
        pieColor = 'rgba(142, 233, 90, 0.8)';
    }  else if( parseInt(data.current.uvi) >= 3 && parseInt(data.current.uvi) <= 5){
        pieColor = 'rgba(229, 233, 90, 0.8)';
    } else if( parseInt(data.current.uvi) >= 6 && parseInt(data.current.uvi) <= 7){
        pieColor = 'rgba(233, 170, 90, 0.8)';
    }else if( parseInt(data.current.uvi) >= 8 && parseInt(data.current.uvi) <= 10){
        pieColor = 'rgba(233, 90, 90, 0.8)';
    }else{
        pieColor = 'rgba(131, 30, 233, 0.8)';
    }

    $(".currentWeatheruvi").attr("style", "border-bottom-color: "+ pieColor +";")

    $("#rest-week").empty();   

    $.each(data.daily, function( index, value ) {
        if(index >= 1 && index <= 5){
            var date = new Date(value.dt * 1000);
            var stringDate = date.toString();  
            var resDate = stringDate.split(" "); 
    
            var divEl = $("<div></div>");

            $(divEl).addClass("eachDay");
            var div2El = $("<div></div>");
            var htag1El = $("<h3> "+ resDate[0] + ' ' + resDate[1] + ' ' + resDate[2] + ' </br>' + resDate[3] +"</h3>");
            $(div2El).append(htag1El);
            $(divEl).append(div2El);

            var div3El = $("<div></div>");
            var htag3El = $("<h13> "+ Math.round(value.temp.day)  + "˚" + " F" +"</h13>");
            $(div3El).append(htag3El);
            $(divEl).append(div3El);

            var div4El = $("<div></div>");
            var imgtag4El = $("<img></img>");
            $(imgtag4El).attr("src", "https://openweathermap.org/img/wn/" + value.weather[0].icon + "@2x.png");
            $(div4El).append(imgtag4El);
            $(divEl).append(div4El);

            var div5El = $("<div></div>");
            var htag5El = $("<h12> Condition: "+ value.weather[0].main +"</h12>");
            $(div5El).append(htag5El);
            $(divEl).append(div5El);

            var div6El = $("<div></div>");
            var htag6El = $("<h12> Humidity: "+ value.humidity +"%</h12>");
            $(div6El).append(htag6El);
            $(divEl).append(div6El);

            $("#rest-week").append(divEl);    
        }
    });

$(".weather-content").attr("style", "display: block;");
}

function storeUserSearch(){
    
    localStorage.setItem("userSearch", JSON.stringify(userSearch));
}

function getStoredSearch(){
    var workingHrsCheck = JSON.parse(localStorage.getItem("userSearch"));
          if (workingHrsCheck !== null) {
            userSearch = workingHrsCheck;
          }
    recentSearch();
}

function recentSearch(){
    var h7El = $("<h7>Recent Search</h7>");
    var div8El = $("<div></div>");
    $.each(userSearch, function( index, value ) {
        document.getElementById("recent").innerHTML= "";
       
        var div7El = $("<div></div>");
       
        var htag7El = $("<h12 onclick='myFunctionElt(this);'><a href='#weather-here' class='aaf' id='users_id'>"+ value +"</a></h12>");
        $(div7El).append(htag7El);
        $(div8El).append(div7El);
    });
    $(".recent-search").append(h7El); 
    $(".recent-search").append(div8El); 
}

