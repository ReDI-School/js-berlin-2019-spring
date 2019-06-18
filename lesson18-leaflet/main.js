let pageUrl = new URL(window.location.href);

// Get the HERE appId / appCode:
let appId = pageUrl.searchParams.get("appId");
let appCode = pageUrl.searchParams.get("appCode");

// Get the Mapbox access token:
let accessToken = pageUrl.searchParams.get("accessToken");

// Initialize Leaflet
let mymap = L.map("map").setView([52.51, 13.37], 13);
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: accessToken
  }
).addTo(mymap);

// Center on the given country
async function centerOnCountry() {
  let searchCountry = document.getElementById("country").value;
  let response = await fetch("https://restcountries.eu/rest/v2/name/" + searchCountry);
  let reply = await response.json();
  if (reply.length > 0) {
    console.log("centering on " + reply[0].latlng);
    mymap.setView(reply[0].latlng, 6);
  }
}

// Reverse geocode the location, output the address
async function onClick(e) {
  let url = "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" + e.latlng.lat + "%2C" +  e.latlng.lng +"%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=" + appId + "&app_code=" + appCode;
  let response = await fetch(url);
  let reply = await response.json();
  let label = reply.Response.View[0].Result[0].Location.Address.Label;

  let popup = L.popup();
  popup.setLatLng(e.latlng).setContent(label).openOn(mymap);
}

mymap.on('click', onClick);
