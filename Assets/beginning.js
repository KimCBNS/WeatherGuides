
// hint: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


let weatherAPIkey = "55ea4734bbe6ae3cc1f9934a5e2e7775";
let city = "Halifax";


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

    // const iconEl = document.createElement("img");
    // iconEl.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    // document.querySelector(".rightPanel").append(iconEl);


    const { lat, lon } = data.coord
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

    fetch(apiUrlForecast).then(response => response.json()).then(data => {
      console.log(data);
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

// <!-- <div class="card bg-dark text-white">
// <div class="card-body">
//  
//   <img class="card-img-top" src="" alt="Weather Icon"> <span name="icon">Icon</span>
//   <p class="card-date">Date: <span name="date">Sunday</span></p>
//   <p class="card-temp">Temperature: <span name="temp">12</span></p>
//   <p class="card-humid">Humidity: <span name="humidity">12</span></p>
//   <p class="card-wind">Wind Speed: <span name="wind">12</span></p>
// </div> -->
// <!--             
// // </div> -->const i = 0;

//   // //humidity
//   console.log(fiveDayData[i].main.humidity);

//   // temp
//   console.log(fiveDayData[i].main.temp);
//   // wind
//   console.log(fiveDayData[i].wind.speed);
//   // icon
//   console.log(fiveDayData[i].weather[0].icon);

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
  
 }
return;
}