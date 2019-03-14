let locationInputElement = document.getElementById("location");
let locationListElement = document.getElementById("locationList");
let detailsElement = document.getElementById("details");

let latitude = 52.510730;
let longitude = 13.372075;

// ### Put your own appId / appCode here:
let appId = undefined;
let appCode = undefined;

// ### Otherwise, please pass the appId / appCode as a URL parameter
if (appId === undefined || appCode === undefined) {
    let url = new URL(window.location.href);
    appId = url.searchParams.get("appId");
    appCode = url.searchParams.get("appCode");
    if (appId === null || appCode === null) {
        document.body.innerHTML = "Please provide an appId/appCode, e.g. <tt>" + window.location.href + "?appId=xxx&appCode=xxx</tt>. Get a free id at: <a href='https://go.engage.here.com/freemium'>https://go.engage.here.com/freemium</a>";
        throw new Error("Please provide an appId/appCode. See https://go.engage.here.com/freemium")
    }
}

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
