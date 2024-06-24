
// open weather api key
let weatherAPIkey = "55ea4734bbe6ae3cc1f9934a5e2e7775";

// get the user inputed city name
let city;
let existingCities = [];
const searchBtn = $("#search");
const searchEl = $("#city")


// get the placeholders to put the current forecast and city
// where to put the items
const cityOneEl = $("#cityOne");
const imgOneEl = $("#imgOne1");




const dateOneEl = $("#dateOne");
const tempOneEl = $("#tempOne");
const humidityOneEl = $("#humidityOne");
const windOneEl = $("#windOne");
const historyBtn = $('.history');


function searchCity(event) {
  event.preventDefault();

  // get the entered city name
  const cityName = searchEl.val().trim();

  // if no name entered return a pop up advising to enter valid info
  if (cityName === "") {
    alert("enter valid city");

  } else {

    city = cityName;
    console.log(city);

    // clear the fields and close the modal window
    searchEl.val(" ");

    // get the weather
    fetchWeather(city);
  }
}


function historyUpdates(correctCityName) {
  // create the array of cities in local storage if it doesn't exist
  existingCities = JSON.parse(localStorage.getItem("cities")) || [];

  if ((existingCities !== null) || (existingCities !== 'undefined')) {
    //this will update taskList variable with the most recent data from local storage
    if (existingCities.includes(correctCityName)) {
      // do nothing and exit
      return
    } else {
      existingCities.push(correctCityName);
      localStorage.setItem('cities', JSON.stringify(existingCities));
      // TODO: update the display list of searched city histories
    }
  } else {
    // if it is empty this sets the first city to the local storage
    existingCities[0] = correctCityName;
    // send to local storage
    localStorage.setItem('cities', JSON.stringify(existingCities));
  }
}

function createHistory() {
  // create the history panel
  existingCities = JSON.parse(localStorage.getItem("cities")) || [];

  if ((existingCities !== null) || (existingCities !== 'undefined')) {
    // get the location to build the list
    const citiesSearched = $('#searched')
    // create a button element for each name in the list
    for (let i = 0; i < existingCities.length; i++) {
      let cityAdd = $('<button>');
      cityAdd.text(existingCities[i]);
      cityAdd.attr("class", "btn btn-primary btn-block mt-2 mb-1 history")
      // append the button to the unordered list (ul)
      citiesSearched.append(cityAdd);
    }
  } else {
    return;
  }
}

function historyRecall(event){
  fetchWeather(event.target.innerText);
}

function createWeatherCards(fiveDayData) {
  console.log(fiveDayData);
  // get the card holder to store the new card
  const cardHolder = $(".card-deck");
 // clear the cards to start
  cardHolder.empty();


 // create each card
 for (let i = 0; i < 5; i++) {
  let card = $('<div>');
  card.attr("class", 'card');

  // create the card-body and give it a class card-body
  let cardBody = $('<div>');
  cardBody.attr("class", 'cardBody');

  // Card Date
  let cardDate = $('<p>');
  cardDate.attr("class", 'card-date');
  const futureDay = dayjs.unix(fiveDayData[i].dt).format("MM/DD/YYYY (hh:mm a ZZ)");
  cardDate.text(futureDay);

 // Card Icon
 let cardIcon = $('<img>');
 cardIcon.attr("class", 'card-icon');
 let imgIcon = `https://openweathermap.org/img/w/${fiveDayData[i].weather[0].icon}.png`;
 cardIcon.attr('src', imgIcon);
 cardIcon.attr('alt', "weather icon");

 // Card Temp
 let cardTemp= $('<p>');
 cardTemp.attr("class", 'card-temp');
 cardTemp.text(fiveDayData[i].main.temp);

// Card Humidity
let cardHumid = $('<p>');
cardHumid.attr("class", 'card-humidity');
cardHumid.text(fiveDayData[i].main.humidity);

// Card Wind Speed
let cardWind = $('<p>');
cardWind.attr("class", 'card-wind');
cardWind.text(fiveDayData[i].wind.speed);
    //card.attr('style', 'width:80; align-items: center; background-color: lightgrey; margin: 3px');
  

  // put it all together and build the card
  cardBody.append(cardDate)
  cardBody.append(cardIcon);
  cardBody.append(cardTemp);
  cardBody.append(cardHumid);
  cardBody.append(cardWind);
  card.append(cardBody);
  cardHolder.append(card);
  
 }
return;
}


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
    // update the date
    dateOneEl.text(dayjs().format("MM/DD/YYYY"));
    // use correct city spelling
    cityOneEl.text(data.name);
    // add the weather icon
    let imgOneIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    imgOneEl.attr('src', imgOneIcon);
    // add the temp, humidity and wind speed
    tempOneEl.text(data.main.temp);
    humidityOneEl.text(data.main.humidity);
    windOneEl.text(data.wind.speed);
    // send the city name to be stored as a search history item
    historyUpdates(data.name);

    // get the latitude and longitude coordinates and call the 5 day forecast with them
    const { lat, lon } = data.coord
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

    fetch(apiUrlForecast).then(response => response.json()).then(data => {
      console.log(data);
      // take the event log and send it to a function to build the cards 
      createWeatherCards(data.list);
      
      console.log("cards created");

    })
  }).catch(error => {
    console.log(error.message);

  })



  //then call display current weather (send to this ) after this
  // after the forecast send out to display the forecast likely after line 35 send the data...
  //check to see if they have already added that city (.includes) don't add it again (most recent on top...think about the order of the loop)
}




$(document).ready(function () {

  // do the set up tasks



  // listen for the add task button to be clicked
  searchBtn.on('click', searchCity);
  historyBtn.on('click', historyRecall);


  createHistory();

});



//round the numbers

//const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`; (for the weather icons)

