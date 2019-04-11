let weekViewElement = document.getElementById("weekView");

// this is today's date
let today = moment();

// this is the first day of this week
let currentWeek = today.clone().subtract(today.day(), "days");

renderWeekView(currentWeek);

function renderWeekView(firstDay) {

    // clear the previous view
    weekViewElement.innerHTML = "";

    // we're only going to show Monday to Friday.
    // Remember - JavaScript starts the week on Sunday (0),
    // so we need to count from 1 (Monday) to 5 (Friday)
    for (let i = 1; i < 6; ++i) {
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

        // This is how you add a 'class' to a HTML element
        dayDivElement.classList.add("day");
        weekViewElement.appendChild(dayDivElement);
    }
}

function nextWeek() {
    currentWeek.add(7, "days");
    renderWeekView(currentWeek);
}

function previousWeek() {
    currentWeek.subtract(7, "days");
    renderWeekView(currentWeek);
}
