let musicLibrary = [];
let libraryElement = document.getElementById("library");

function addToLibrary() {
    let music = document.getElementById("name").value;
    musicLibrary.push(music);
    musicLibrary.sort();
    libraryElement.innerHTML = "";
    for (let item of musicLibrary) {
        libraryElement.textContent += item + "\n";
    }
}
