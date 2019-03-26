let pageUrl = new URL(window.location.href);

let YOUR_API_KEY = pageUrl.searchParams.get("apiKey");

function getLocation() {
    navigator.geolocation.getCurrentPosition(printLocation);
}

function printLocation(location) {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;

    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
    getTimeZoneLocalTime(lat, lng);
}

async function getTimeZoneLocalTime(lat, lng) {
    let url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${YOUR_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;

    let response = await fetch(url);
    let reply = await response.json();
    let localTime = reply.formatted.split(' ')[1];
    let timeZone = reply.zoneName;
    printTimeZoneLocalTime(localTime, timeZone);
}

function printTimeZoneLocalTime(localTime, timeZone) {
    document.getElementById("tz").textContent = timeZone;
    document.getElementById("locTime").textContent = localTime;
    populateFriendsTimeZones();
}

function populateFriendsTimeZones() {
    let timezoneStrings = moment.tz.names();
    let selectElement = document.getElementById("frndTimeZones");
    for (let zone of timezoneStrings) {
        let optionElement = document.createElement("option");
        optionElement.textContent = zone;
        selectElement.appendChild(optionElement);
    }
}

function calculateFriendsTime() {
    let friendsTimeZone = document.getElementById("frndTimeZones").value;
    let myTimeZone = document.getElementById("tz").textContent;
    let currentMoment = moment().tz(myTimeZone);
    let friendMoment = currentMoment.clone().tz(friendsTimeZone);
    document.getElementById("frndLocTime").textContent = friendMoment.format("h:mm:ss");
}
