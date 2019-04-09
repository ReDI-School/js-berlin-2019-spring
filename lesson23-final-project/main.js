// this is today's date
let today = moment();

let weekViewElement = document.getElementById("weekView");

// we're only going to show Monday to Friday.
// Remember - JavaScript starts the week on Sunday (0),
// so we need to count from 1 (Monday) to 5 (Friday)
for (let i = 1; i < 6; ++i) {
    // create a new div for every day
    let dayDivElement = document.createElement("div");

    // note - we need to clone() today, otherwise, we modify
    // "today" itself!
    let day = today.clone();

    // The math here is a bit tricky - we need to figure out how
    // many days to add.
    // Let's say that today is Tuesday (2), then the result must be:
    // i === 1 -> add -1 days
    // i === 2 -> add 0 days
    // i === 3 -> add 1 day
    // i === 4 -> add 2 days
    // i === 5 -> add 3 days
    // thus, the formula is "i - today.day()"
    day.add(i - today.day(), 'days');

    // Note - month starts counting at zero, but humans start
    // counting from 1
    let todayString = `${day.date()}.${day.month() + 1}`;

    // if we're rendering today, make the string bold
    if (today.day() === i) {
        todayString = "<b>" + todayString + "</b>";
    }
    dayDivElement.innerHTML = todayString;

    // This is how you add a 'class' to a HTML element
    dayDivElement.classList.add("day");
    weekViewElement.appendChild(dayDivElement);
}
