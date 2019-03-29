let searchFieldElement = document.getElementById('searchElement');
let resultListElement = document.getElementById('resultList');

// we use this URL + the search terms from the user to ask wikipedia for the information we need
let apiURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";


async function search() {
  let searchTerm = searchFieldElement.value;
  // encodeURIComponent is used to convert "illegal" characters to something that can be sent over the internet
  let requestURL = apiURL + encodeURIComponent(searchTerm);
  let response = await fetch(requestURL);
  let result = await response.json();
  let searchResults = result.query.search;
  console.log(searchResults);
  render(searchResults);
}

function render(searchResults) {
  // we clear the contents of the list every time we want to show new results
  resultListElement.innerHTML = "";
  for (let result of searchResults) {
    let li = document.createElement('li');
    resultListElement.appendChild(li);

    // add a link to the wikipedia page itself
    let anchor = document.createElement('a');
    anchor.textContent = result.title;
    let pageLink = "https://en.wikipedia.org/wiki/" + encodeURIComponent(result.title);

    anchor.href = pageLink;
    // target="_blank" will make the page open in a new tab
    anchor.target = "_blank";
    li.appendChild(anchor);

    // add an iframe that will load the wikipedia page itself directly into our page
    let iframe = document.createElement('iframe');
    iframe.src = pageLink;

    // we wrap the iframe in a div so that it is on its own line, separated from the link
    let div = document.createElement('div');
    div.appendChild(iframe);
    li.appendChild(div);
  }
}
