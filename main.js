const projectElement = document.getElementById("projects");

async function getProjects() {
    let result = [];

    const response = await fetch("dirs");
    if (!response.ok)
        throw new Error("Invalid response: " + response.statusText);
    const reply = await response.text();
    return reply.trim().split("\n");
}

async function render() {
    let projects = await getProjects();
    for (let project of projects) {
        let listItemElement = document.createElement("li");
        let anchorElement = document.createElement("a");
        anchorElement.href = project;
        anchorElement.textContent = project;
        listItemElement.appendChild(anchorElement);
        projectElement.appendChild(listItemElement);
    }
}

render();
