let weekViewElement = document.getElementById("weekView");


//we define here all of the holidayRegions that we want in our calendar
//make sure you import the moment-holiday-pkg script in your html file
//this should run before we create any moment objects, otherwise it wont work!
let holidayRegions = ['Germany', 'United States', 'United Kingdom', 'Switzerland'];
for (let region of holidayRegions) {
    moment.modifyHolidays.add(region)
}

// this is today's date
let today = moment();

// get the timezone, moment can already do that!
//make sure you import the moment-timezone-with-data script in your html file
let timezone = moment.tz.guess();

// this variable points to the Sunday of the
// week that is currently being rendered
let currentSunday = today.clone().startOf("week");

let events = [];

// This function saves all the events to local storage
function saveEvents() {
    localStorage.setItem("EVENTS", JSON.stringify(events));
}

// This function loads all the events from local storage
function loadEvents() {
    let eventString = localStorage.getItem("EVENTS");
    if (eventString !== null) {
        events = JSON.parse(eventString);
        for (let event of events) {
            // note - JSON.stringify converts all our
            // moment() objects to strings. We need to
            // turn those strings into moment objects again!
            event.start = moment(event.start);
            event.end = moment(event.end);
        }
    }
}

function isSameDay(day1, day2) {
    // we have to convert the moment objects to UTC times so that we can compare them with regard to timezones
    let day1UTC = day1.clone().utc();
    let day2UTC = day2.clone().utc();
    return day1UTC.year() === day2UTC.year() && day1UTC.dayOfYear() === day2UTC.dayOfYear();
}

function renderDayView(day, dayDivElement) {
    // isHoliday() will return the name(s) of holidays on this day if there are any
    // otherwise it will return false;
    let holiday = day.isHoliday();
    if (holiday) {
        let holidayEventElement = document.createElement('div');
        holidayEventElement.textContent = 'Holiday: ' + holiday;
        dayDivElement.classList.add("holiday");
        dayDivElement.appendChild(holidayEventElement);
    }
    // go through all our events
    for (let event of events) {
        if (isSameDay(event.start, day)) {
            // the event starts today, render it!
            let eventDivElement = document.createElement("div");
            eventDivElement.textContent = event.start.clone().tz(timezone).format("HH:mm")
                + " - "
                + event.end.clone().tz(timezone).format("HH:mm")
                + ": "
                + event.title;
            dayDivElement.appendChild(eventDivElement);
        }
    }
}

function renderWeekView(firstDay) {

    // clear the previous view
    weekViewElement.innerHTML = "";

    const MondayIndex = 1;
    const FridayIndex = 5;

    // we're only going to show Monday to Friday.
    // Remember - JavaScript starts the week on Sunday (0),
    // so we need to count from 1 (Monday) to 5 (Friday)
    for (let i = MondayIndex; i <= FridayIndex; ++i) {
        // create a new div for every day
        let dayDivElement = document.createElement("div");

        // note - we need to clone() today, otherwise, we modify
        // "firstDay" itself!
        let day = firstDay.clone();
        day.add(i, 'days');

        // Note - month starts counting at zero, but humans start
        // counting from 1
        let dayString = day.format("ddd, DD.MM");

        // if we're rendering today, make the string bold
        if (isSameDay(today, day)) {
            dayString = "<b>" + dayString + "</b>";
        }
        dayDivElement.innerHTML = dayString;

        renderDayView(day, dayDivElement);

        // This is how you add a 'class' to a HTML element
        dayDivElement.classList.add("day");
        weekViewElement.appendChild(dayDivElement);
    }
}

function nextWeek() {
    currentSunday.add(1, "week");
    renderWeekView(currentSunday);
}

function previousWeek() {
    currentSunday.subtract(1, "week");
    renderWeekView(currentSunday);
}

let eventTileElement = document.getElementById("eventTitle");
let eventStartDateElement = document.getElementById("eventStartDate");
let eventStartTimeElement = document.getElementById("eventStartTime");
let eventEndDateElement = document.getElementById("eventEndDate");
let eventEndTimeElement = document.getElementById("eventEndTime");

function addEvent() {
    let newEvent = {
        title: eventTileElement.value,
        start: moment(eventStartDateElement.value + " " + eventStartTimeElement.value),
        end: moment(eventEndDateElement.value + " " + eventEndTimeElement.value)
    }

    events.push(newEvent);
    saveEvents();
    renderWeekView(currentSunday);
}

let timezoneElement = document.getElementById('timezone');
function changeTimeZone() {
    let tz = timezoneElement.value;
    timezone = tz;
    // set the default timezone, all new moment objects will have this new timezone
    moment.tz.setDefault(tz);
    today = today.tz(tz)
    currentSunday = today.clone().startOf("week");
    renderWeekView(currentSunday);
}
loadEvents();
renderWeekView(currentSunday);
