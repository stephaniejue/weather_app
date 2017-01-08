$(document).ready(function() {
  console.log("ready!");

  // $("#get_weather").on("click", function() {
  //   alert("clicked!!");

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    $.ajax( {
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&APPID=31f8be6186325550e955c4ee2566a726",
      type: 'GET',
      crossDomain: true,
      success: function(data) {
        var weather = data;
        console.log(weather);
        $('#location').html(weather.name);
        $('#temp').html(weather.main.temp);
        $('#humidity').html(weather.main.humidity);
        $('#weather_main').html(weather.weather.main);
        $('#weather_desc').html(weather.weather.description);
        $('#weather_icon').html(weather.weather.icon);
      },
      error: function() { alert('Failed!'); },
      cache: false
    });

  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);


  // });



  // Call API by city ID i
  // "http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY}"
});
