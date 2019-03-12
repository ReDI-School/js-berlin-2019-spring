let outputElement = document.getElementById("output");
let appId = undefined; // Enter your appId here

async function getWeather(city) {
  if (appId === undefined) {
      return "No AppId. Hope it's sunny.";
  }

  let url = "https://openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId;
  let response = await fetch(url);
  let reply = await response.json();
  return reply;
}

async function loadCountry() {
  let searchCountry = document.getElementById("country").value;
  let response = await fetch(
    "https://restcountries.eu/rest/v2/name/" + searchCountry
  );
  let reply = await response.json();

  // clear the old content
  outputElement.innerHTML = "";

  for (let country of reply) {
    // create a couple of HTML elements
    let heading = document.createElement("h4");
    heading.textContent = country.name;

    let p = document.createElement("p");
    p.textContent = "Region " + country.region + ", capital " + country.capital;

    let image = document.createElement("img");
    image.src = country.flag;
    image.width = "100";

    let weatherElement = document.createElement("div");

    let weatherButton = document.createElement("button");
    weatherButton.textContent = "weather";

    weatherButton.onclick = async function() {
      let city = country.capital;
      let weather = await getWeather(city);
      weatherElement.textContent = "It is " + weather.main.temp + " degrees";
    }

    // add the elements to our div
    outputElement.appendChild(heading);
    outputElement.appendChild(p);
    outputElement.appendChild(image);
    outputElement.appendChild(weatherButton);
    outputElement.appendChild(weatherElement);
  }
}
