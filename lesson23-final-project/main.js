let weekViewElement = document.getElementById("weekView");

// this is today's date
let today = moment();

// this is the first day of this week
let currentWeek = today.clone().startOf("week");

let events = [
    {
        start: moment(),
        end: moment().add(1, 'hour'),
        title: "My important meeting"
    },
    {
        start: moment().add(1, 'day'),
        end: moment().add(1, 'day').add(1, 'hour'),
        title: "My more important meeting"
    }
];

function renderDayView(day, dayDivElement) {
    // go through all our events
    for (let event of events) {
        if (event.start.year() === day.year() && event.start.dayOfYear() === day.dayOfYear()) {
            // the event starts today, render it!
            let eventDivElement = document.createElement("div");
            eventDivElement.textContent = event.start.format("HH:mm")
                + " - "
                + event.end.format("HH:mm")
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
        let todayString = `${day.date()}.${day.month() + 1}`;

        // if we're rendering today, make the string bold
        if (today.year() === day.year() && today.dayOfYear() === day.dayOfYear()) {
            todayString = "<b>" + todayString + "</b>";
        }
        dayDivElement.innerHTML = todayString;

        renderDayView(day, dayDivElement);

        // This is how you add a 'class' to a HTML element
        dayDivElement.classList.add("day");
        weekViewElement.appendChild(dayDivElement);
    }
}

function nextWeek() {
    currentWeek.add(1, "week");
    renderWeekView(currentWeek);
}

function previousWeek() {
    currentWeek.subtract(1, "week");
    renderWeekView(currentWeek);
}

renderWeekView(currentWeek);
