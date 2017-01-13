$(document).ready(function() {
  // console.log("ready!");
  currentTime();

  //function to add time icons
  function currentTime() {
    //get current time
    var timeNow = new Date(Date.now());
    console.log(timeNow);
    //creates substring of numbers before first :
    hour = timeNow.toLocaleTimeString().substring(0, timeNow.toLocaleTimeString().indexOf(':'));
    console.log(hour);
    //change icon class to new icon using getTimeIcon function
    $('#time_icon').removeClass().addClass(getTimeIcon(hour));
    changeBackgroundImg(timeNow);
  }

  function changeBackgroundImg(time) {
    time = time.toString();
    console.log(time);
    hour = parseInt((time.substring(time.indexOf(':') - 2, time.indexOf(':'))));
    console.log(hour);
    if (hour >= 17 || hour <= 5) {
      $('body').css({'background': "url('https://static.pexels.com/photos/26404/pexels-photo.jpg') no-repeat center center fixed"});
      $('body').css({"background-size":"cover"});
      $('body').css({"color":"#c4e5cf"});
    } else if ( hour > 5 ){
      $('body').css({'background': "url('https://static.pexels.com/photos/253892/pexels-photo-253892.jpeg') no-repeat center center fixed"});
      $('body').css({"background-size":"cover"});
      $('body').css({"color":"#92c33c"});
    }
  }
  // fog: https://static.pexels.com/photos/48678/pexels-photo-48678.jpeg
  // sun: https://static.pexels.com/photos/128994/pexels-photo-128994.jpeg
  // rain: https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg; $('body').css({"color":"#3e2887"});

  function getTimeIcon(hour) {
    //object of time icon class key pairs
    var time_icons = {
      '1': 'wi wi-time-1',
      '2': 'wi wi-time-2',
      '3': 'wi wi-time-3',
      '4': 'wi wi-time-4',
      '5': 'wi wi-time-5',
      '6': 'wi wi-time-6',
      '7': 'wi wi-time-7',
      '8': 'wi wi-time-8',
      '9': 'wi wi-time-9',
      '10': 'wi wi-time-10',
      '11': 'wi wi-time-11',
      '12': 'wi wi-time-12'
    };
   return time_icons[hour];
   }

  //function call for navigator.geolocation
  navigator.geolocation.getCurrentPosition(success, error, options);

  //success function is called if nagvigator.geolocation is available
  function success(pos) {
    //variable of position coordinates
    var crd = pos.coords;
    console.log(crd);
    console.log('Your nav.geo current position is:');
    console.log(`Latitude: ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    //api call to openweather map with lat/lng coordinates
    $.ajax( {
      url: "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&APPID=31f8be6186325550e955c4ee2566a726",
      type: 'GET',
      crossDomain: true,
      success: function(data) {
        //callback funcition to manipulate DOM
        getWeatherInfo(data);
      },
      error: function() {
        console.log('Failed (nav.geo)');
      },
    });
  };

  //options for navigator.geolocation
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  //error function is called if nagvigator.geolocation does not work
  function error(err) {
    //workaround if navigator.geolocation fails (403 error)
    $.getJSON("http://ipinfo.io", function(ipinfo){
        //splits data into array and pulls first and second item
        lat = ipinfo.loc.split(",")[0];
        lng = ipinfo.loc.split(",")[1];
        console.log("Ipinfo Location ["+ipinfo.loc+"]");
        console.log("Your ipinfo current location is:");
        console.log('Latitude: ' + lat);
        console.log('Longitude: ' + lng);
        //api call to openweather map with lat/lng coordinatesfrom ipinfo
        $.ajax( {
          url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=31f8be6186325550e955c4ee2566a726",
          type: 'GET',
          crossDomain: true,
          success: function(data) {
            //callback function to manipulate DOM
            getWeatherInfo(data);
          },
          error: function() {
            console.log('Failed (ipinfo)');
          },
        });
    });
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  //converts kelvin(default) to fahrenheit
  function toFahrenheit(kelvin){
    return (9/5 * (kelvin - 273)) + 32;
  };

  //callback frunction that takes JSON response and manipulates DOM
  function getWeatherInfo(data) {
    var weather = data;
    console.log(weather);
    //changes icon class to current weather icon via getIcon
    $('#icon').attr('class', getWeatherIcon(weather.weather[0].icon));
    console.log(weather.weather)
    console.log(weather.weather[0].main);
    console.log(weather.weather[0].description);
    console.log(weather.weather[0].icon);
    //city, country
    $('#location').html(weather.name + ", " + weather.sys.country);
    //converts sunrise into locale time string
    var sunrise = new Date(weather.sys.sunrise * 1000);
    $('#sunrise').html(sunrise.toLocaleTimeString());
    //converts sunset into locale time string
    var sunset = new Date(weather.sys.sunset * 1000);
    $('#sunset').html(sunset.toLocaleTimeString());
    //calls fahrenheit conversion function
    var tempF = toFahrenheit(weather.main.temp).toFixed(2);
    //calls celsius conversion function
    $('#temp').html(tempF);
    //humidity
    $('#humidity').html(weather.main.humidity + " %");
    $('#weather_main').html(weather.weather[0].main);
    $('#weather_desc').html(weather.weather[0].description);
    $('#weather_icon').html(weather.weather[0].icon);
  }

  function getWeatherIcon(icon) {
    // console.log(icon);
    var icon_list = {
      '01d': 'wi wi-day-sunny',
      '02d': 'wi wi-day-cloudy',
      '03d': 'wi wi-day-sunny-overcast',
      '04d': 'wi wi-day-cloudy-high',
      '09d': 'wi wi-day-showers',
      '10d': 'wi wi-day-rain',
      '11d': 'wi wi-day-thunderstorm',
      '13d': 'wi wi-day-snow',
      '50d': 'wi wi-day-fog',
      '01n': 'wi wi-night-clear',
      '02n': 'wi wi-night-cloudy',
      '03n': 'wi wi-night-alt-partly-cloudy',
      '04n': 'wi wi-night-cloudy-high',
      '09n': 'wi wi-night-showers',
      '10n': 'wi wi-night-rain',
      '11n': 'wi wi-night-thunderstorm',
      '13n': 'wi wi-night-snow',
      '50n': 'wi wi-night-fog'
      };
    // if icon_list isn't found  return N/A
    if (icon_list[icon] === undefined) {
      return "wi-na";
     }
    // else return the icon
    else {
       return icon_list[icon];
     }
   }

   function farToCel(far) {
     return (far - 32) * 5/9;
   }
   function celToFar(cel) {
     return (cel * 9/5) + 32
   }

   $('#toggle').on("click", "button", function() {
     var scale = $('button.active').text();
     console.log('scale is: ' + scale);
     var temp = parseFloat($('#temp').text());
     console.log('temp is: ' + temp);
     if (scale.includes("F")) {
       $('#temp').html(farToCel(temp).toFixed(2));
     } else if (scale.includes("C")) {
       $('#temp').html(celToFar(temp).toFixed(2));
     };
   })

});
