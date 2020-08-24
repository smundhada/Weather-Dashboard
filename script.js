$( document ).ready(function() {
    console.log( "Getting Weather for Baytown!" );
    getForecast();
});

function getForecast() {

    var APIKey = "&appid=218fcfa71868ebd1367879a676a451a5"
    var corQueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=77521,us" + APIKey;
    //= "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + ",us" + APIKey;
    //= "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly" + APIKey;
    //= "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us" + APIKey;
    $.ajax({
      url: corQueryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);
      var cityLatLoc = response.city.coord.lat;
      var cityLonLoc = response.city.coord.lon;
    

      var forQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatLoc + "&lon=" + cityLonLoc + "&exclude=hourly" + APIKey;
      //"https://api.openweathermap.org/data/2.5/uvi?appid=" + "218fcfa71868ebd1367879a676a451a5" + "&lat=" + cityLat + "&lon=" + cityLon;
      // "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=hourly" + APIKey;


    $.getJSON( forQueryURL, function( data ) {
        console.log(data);
    });

    })
    .catch((error) => {
        console.log(error)
    });
}
