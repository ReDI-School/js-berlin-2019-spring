let pageUrl = new URL(window.location.href);

// Get the HERE appId / appCode:
let appId = pageUrl.searchParams.get("appId");
let appCode = pageUrl.searchParams.get("appCode");

// Get the Mapbox access token:
let accessToken = pageUrl.searchParams.get("accessToken");

// Get the FourSquare id:
let clientId = pageUrl.searchParams.get("clientId");
let clientSecret = pageUrl.searchParams.get("clientSecret");

// This function returns the isoline around the center
// See https://developer.here.com/documentation/routing/topics/resource-calculate-isoline.html
async function getIsoLine() {

    let url = "https://isoline.route.api.here.com/routing/7.2/calculateisoline.json?mode=fastest%3Bpedestrian&start=52.510730%2C13.372075&rangetype=time&range=900&app_id=" +  appId + "&app_code=" + appCode;

    let response = await fetch(url);
    let reply = await response.json();

    let isoline = reply.response.isoline[0].component[0].shape;
    return isoline;
}

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

// render the polygon
async function renderPolygon() {
    let isoline = await getIsoLine();

    // note - HERE API returns a string with the
    // lat and lon separated by a comma. We need to split
    // that to get a Leaflet polygon
    let leafletCoords = [];
    for (let coordinate of isoline) {
        leafletCoords.push(coordinate.split(","));
    }

    let polygon = L.polygon(leafletCoords);
    polygon.addTo(mymap);
}

renderPolygon();

async function getVenues() {
  let response = await fetch("https://api.foursquare.com/v2/venues/search?ll=52.510730,13.372075&query=pizza&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20190326"
  );

  let reply = await response.json();
  for (let venue of reply.response.venues) {
      let marker = L.marker([ venue.location.lat, venue.location.lng ]);
      marker.addTo(mymap);
      marker.bindPopup(venue.name);
  }
}

getVenues();
