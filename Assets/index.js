


let weatherAPIkey = "55ea4734bbe6ae3cc1f9934a5e2e7775";
let city = "Halifax";

// get the placeholders to put the current forecast and city
// where to put the items
const cityOneEl = $("#cityOne");
const imgOneEl = $("#imgOne");
const dateOneEl = $("#dateOne");
const tempOneEl = $("#tempOne");
const humidityOneEl = $("#humidityOne");
const windOneEl = $("#windOne");






fetchWeather(city);


function fetchWeather(city) {

  const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherAPIkey}&q=${city}&units=imperial`;

  fetch(apiUrlWeather).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error("City does not exist")
    } else {
      return response.json()
    }

  }).then(data => {
    console.log(data);
    dateOneEl.text(dayjs().format("MM/DD/YYYY"));
    cityOneEl.text(data.name);

    let imgOneIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    console.log(imgOneIcon);
    imgOneEl.attr('src', imgOneIcon);
    // style it here

    tempOneEl.text(data.main.temp);
    humidityOneEl.text(data.main.humidity);
    windOneEl.text(data.wind.speed);


    const { lat, lon } = data.coord
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

    fetch(apiUrlForecast).then(response => response.json()).then(data => {
      console.log(data);
      // should I double check that it is halifax ??? city.name

      //humidity
      console.log(data.list[0].main.humidity);
      // temp
      console.log(data.list[0].main.temp);
      // wind
      console.log(data.list[0].wind.speed);


    })
  }).catch(error => {
    console.log(error.message);
    // bootstrap module in final
  })

  // save the city if response is ok, line 24 data.name (will give the correct spelling and title case)
  //then call display current weather (send to this ) after this
  // after the forecast send out to display the forecast likely after line 35 send the data...
  //check to see if they have already added that city (.includes) don't add it again (most recent on top...think about the order of the loop)
}


//const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; (for the weather icons)