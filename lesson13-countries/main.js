let outputElement = document.getElementById("output");

async function loadCountry() {
  let searchCountry = document.getElementById("country").value;
  let response = await fetch(
    "https://restcountries.eu/rest/v2/name/" + searchCountry
  );
  let reply = await response.json();

  for (let country of reply) {
    // create a couple of HTML elements
    let heading = document.createElement("h4");
    heading.textContent = country.name;

    let p = document.createElement("p");
    p.textContent = "Region " + country.region + ", capital " + country.capital;

    let image = document.createElement("img");
    image.src = country.flag;
    image.width = "100";

    // clear the old content
    output.innerHTML = "";

    // add the elements to our div
    output.appendChild(heading);
    output.appendChild(p);
    output.appendChild(image);
  }
}
