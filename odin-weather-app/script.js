let tempUnit = " °C";
let windUnit =" m/s"
let unit = "metric";
let currentCity = "Goiania";

let weather = {
    apiKey: "86562b090994c95b38b855bc43823ea0",
    fetchWeather: function (city) {
      currentCity = city;
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city + "&units=" +
          unit + "&appid=" +
          this.apiKey 
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      console.log(data);
      const { name } = data;
      const { temp, feels_like, humidity } = data.main;
      const { speed } = data.wind;
      const {description, icon} = data.weather[0];
      document.querySelector(".city").innerText = name;
      document.querySelector(".temp").innerText = temp + tempUnit;
      document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; 
      document.querySelector(".description").innerText = "Description: " + description;
      document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + tempUnit;
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + windUnit;
      document.body.style.background=
        " url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.querySelector("body").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });

    const displayF = document.querySelector(".units-f");
    
    const displayC = document.querySelector(".units-c");

    displayC.addEventListener("click", function () {
        
       
        displayC.style.display = "none";
        displayF.style.display = "block";
        unit = "metric";
        tempUnit = " °C";
        windUnit = " m/s";
        weather.fetchWeather(currentCity);
      });
      
    displayF.addEventListener("click", function () {
        
      
        displayF.style.display = "none";
        displayC.style.display = "block";
        unit = "imperial";
        tempUnit = " °F";
        windUnit = " miles/h";
        weather.fetchWeather(currentCity);
      }); 

    
window.onload = function () {
    document.querySelector("body").classList.add("loading");
    weather.fetchWeather("Goiania");
};
