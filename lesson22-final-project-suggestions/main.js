let projectsElement = document.getElementById("projects");

let projects = [
    {
        name: "CalIdea",
        owner: "Helga",
        description: [
            "Show a calendar with different time zones, making it easier for global teams to schedule events and tasks",
            "Show national holidays",
            "Show contacts and tasks on calendar",
            "Save in local storage"
        ]
    },
    {
        name: "Play Date for Pets",
        owner: "Bahara",
        description: [
            "API for getting data about pet owners and pet lovers",
            "Show on map",
            "Recommended locations",
            "Save user profile"
        ]
    },
    {
        name: "To Eat or Not to Eat",
        owner: "Katja",
        description: [
            "Plant identification API",
            "Can I eat that?",
            "Information about the Plant",
            "Recipes"
        ]
    },
    {
        name: "To Learn List",
        owner: "Toto",
        description: [
            "List of things you want to learn",
            "Connect with other learners",
            "Leaflet for showing on map",
            "Autocomplete existing learning topics",
            "Data API for saving lists"
        ]
    },
    {
        name: "Desert Tech Model",
        owner: "John",
        description: [
            "Map around mediterranean sea (Leaflet)",
            "Clickable points on the map for solar panel positions",
            "Weather for a GPS position",
            "Calculation of % of energy transfer between locations, high to low voltage"
        ]
    },
    {
        name: "Best Dictionary Ever",
        owner: "Toto",
        description: [
            "Translation preferences from multiple sources",
            "Gendered words with indicator"
        ]
    },
    {
        name: "Leftovers",
        owner: "Bahara",
        description: [
            "Scan barcode of leftover foods, get recipes for them",
            "Find a library for barcode scanning",
            "Look up the barcode in a food database",
            "Look up a recipe for all the food items"
        ]
    },
    {
        name: "Band Aid",
        owner: "Katja",
        description: [
            "Connect bands / artists with venues",
            "Add profiles for each venue",
            "Show location of venue on Leaflet"
        ]
    },
    {
        name: "Sky Map",
        owner: "Yegi",
        description: [
            "Description about planets in the universe",
            "Planetarium view with path showing information",
            "Photos, distance from earth"
        ]
    }
];

let i = 1;

for (let project of projects) {
    projectsElement.innerHTML += `<h2>${i++}: ${project.name}</h2>`;
    projectsElement.innerHTML += `Owner: ${project.owner}`;
    let ulElement = document.createElement("ul");
    for (let sentence of project.description) {
        let liElement = document.createElement("li");
        liElement.textContent = sentence;
        ulElement.appendChild(liElement);
    }
    projectsElement.appendChild(ulElement);
}
