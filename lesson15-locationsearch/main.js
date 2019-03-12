let locationInputElement = document.getElementById("location");
let locationListElement = document.getElementById("locationList");
let detailsElement = document.getElementById("details");

let appId = undefined;
let appCode = undefined;

let latitude = 52.510730;
let longitude = 13.372075;

let suggestUrl = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + latitude + "%2C" + longitude + "&app_id=" + appId + "&app_code=" + appCode + "&q=";

async function complete() {

    if (appId === undefined || appCode === undefined) {
        console.log("No appId/appCode");
        return;
    }

    let url = suggestUrl + encodeURIComponent(locationInputElement.value);

    let response = await fetch(url);
    let result = await response.json();

    locationListElement.innerHTML = "";

    for (let suggestion of result.results) {
        let element = document.createElement("option");
        element.textContent = suggestion.title;
        locationListElement.appendChild(element);
    }

    // show some information about the first result
    if (result.results.length > 0) {
        let firstResult = result.results[0];
        if (firstResult.position !== undefined) {
            detailsElement.textContent =
                "Lat: " + firstResult.position[0]
                + " Lon: " + firstResult.position[1];
        }
    }
}
