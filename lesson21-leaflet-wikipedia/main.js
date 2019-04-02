let pageUrl = new URL(window.location.href);

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

async function getWikipediaPlaces() {
  let url = "https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=52.5106|13.3724&format=json&origin=*";

  let response = await fetch(url);
  let reply = await response.json();

  console.log(reply);

  for (let place of reply.query.geosearch) {
    let title = place.title;
    let lat = place.lat;
    let lon = place.lon;

    /*
    let anchor = '<a href="'
      + "http://en.wikipedia.org/?curid=" + place.pageid
      + '" target="_blank">' + title + "</a>";
    */

    // Note - this is a JavaScript template string
    let anchor = `<a href="http://en.wikipedia.org/?curid=${place.pageid}"
    target="_blank">${title}</a>`;

    let marker = L.marker([ lat, lon ]);
    marker.addTo(mymap);
    marker.bindPopup(anchor);
  }

}

getWikipediaPlaces();
