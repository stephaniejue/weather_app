$(document).ready(function() {
  // console.log("ready!");
  currentTime();


  //function to add time icons
  function currentTime() {
    //get current time
    var timeNow = new Date(Date.now());
    //translate time to AM/PM format then pull the first number
    hour = timeNow.toLocaleTimeString()[0].toString();
    //update icon class using getTimeIcon
    $('#time_icon').removeClass().addClass(getTimeIcon(hour));
  }

  function getTimeIcon(hour) {
    //object of time icon class key pairs
    var time_icons = {
      "1": "wi wi-time-1",
      "2": "wi wi-time-2",
      "3": "wi wi-time-3",
      "4": "wi wi-time-4",
      "5": "wi wi-time-5",
      "6": "wi wi-time-6",
      "7": "wi wi-time-7",
      "8": "wi wi-time-8",
      "9": "wi wi-time-9",
      "10": "wi wi-time-10",
      "11": "wi wi-time-11",
      "12": "wi wi-time-12"
    };
   return time_icons[hour];
   }

  //function to get current geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  function success(pos) {
    var crd = pos.coords;
    console.log(crd);
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    $.ajax( {
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&APPID=31f8be6186325550e955c4ee2566a726",
      type: 'GET',
      crossDomain: true,
      success: function(data) {
        getWeatherInfo(data);
      },
      error: function() {
        console.log('Failed!');
      },
    });

  };
  function error(err) {
    var latLong;
    $.getJSON("http://ipinfo.io", function(ipinfo){
        console.log("Location ["+ipinfo.loc+"]");
        lat = ipinfo.loc.split(",")[0];
        lng = ipinfo.loc.split(",")[1];
        console.log(lat);
        console.log(lng);
        $.ajax( {
          url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=31f8be6186325550e955c4ee2566a726",
          type: 'GET',
          crossDomain: true,
          success: function(data) {
            getWeatherInfo(data);
          },
          error: function() {
            console.log('Failed!');
          },
        });
    });
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  function toFarenheit(kelvin){
    return (9/5 * (kelvin - 273)) + 32;
  };

  function toCelsius(kelvin){
    return kelvin - 273;
  };

  function getWeatherInfo(data) {
    var weather = data;
    console.log(weather);
    $('#location').html(weather.name + ", " + weather.sys.country);
    var sunrise = new Date(weather.sys.sunrise * 1000);
    $('#sunrise').html(sunrise.toLocaleTimeString());

    var sunset = new Date(weather.sys.sunset * 1000);
    $('#sunset').html(sunset.toLocaleTimeString());


    var tempF = toFarenheit(weather.main.temp).toFixed(2);
    var tempC = toCelsius(weather.main.temp).toFixed(2);

    $('#temp').html(tempF + " F");
    $('#humidity').html(weather.main.humidity + " %");
    $('#weather_main').html(weather.weather[0].main);
    $('#weather_desc').html(weather.weather[0].description);
    $('#weather_icon').html(weather.weather[0].icon);

    $('#icon').removeClass().addClass(getIcon(weather.weather[0].icon));

    console.log(weather.weather)
    console.log(weather.weather[0].main);
    console.log(weather.weather[0].description);
    console.log(weather.weather[0].icon);
  }



  function getIcon(icon) {
    console.log(icon);
    var icon_list = {
      "01d": "wi wi-day-sunny",
      "02d": "wi wi-day-cloudy",
      "03d": "wi wi-day-sunny-overcast",
      "04d": "wi wi-day-cloudy-high",
      "09d": "wi wi-day-showers",
      "10d": "wi wi-day-rain",
      "11d": "wi wi-day-thunderstorm",
      "13d": "wi wi-day-snow",
      "50d": "wi wi-day-fog",
      "01n": "wi wi-night-clear",
      "02n": "wi wi-night-cloudy",
      "03n": "wi wi-night-alt-partly-cloudy",
      "04n": "wi wi-night-cloudy-high",
      "09n": "wi wi-night-showers",
      "10n": "wi wi-night-rain",
      "11n": "wi wi-night-thunderstorm",
      "13n": "wi wi-night-snow",
      "50n": "wi wi-night-fog"
      };
     if (icon_list[icon] === undefined) {
      return "wi-na";
     }
     else {
       return icon_list[icon];
     }
   }

});
