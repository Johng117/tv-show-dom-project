//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  let allSeasons = episodeList;
  const gridField = document.getElementById("grid-container");
  const selectBox = document.getElementById("episodeDropDown");
  // created a function to take an object of the episodes array

  function episode(obj) {
    let episodeCard = document.createElement("article");
    episodeCard.className = "article";
    episodeCard.id = obj.id;
    // create container for title name and episode/series number
    const titleBox = document.createElement("div");
    titleBox.id = "titleBox";
    titleBox.innerHTML = `${obj.name} - S0${obj.season}0${obj.number}`;

    // create image element
    const episodeImage = document.createElement("img");
    episodeImage.src = `${obj.image["medium"]}`;
    episodeImage.id = "imageBox";
    // create text box element
    const episodeText = document.createElement("div");
    episodeText.id = "textBox";
    // format episode summary text
    const innerText = obj.summary.slice(3, -4);
    episodeText.innerHTML = innerText;
    // create an option element to add to the select form
    const opt = document.createElement("option");
    opt.value = `#${obj.id}`;
    opt.href = opt.value;
    opt.text = `S0${obj.season}${(obj.number < 10 ? "0" : "") + obj.number} - ${
      obj.name
    }`;
    // append the created elements to the episodeCard element
    episodeCard.appendChild(titleBox);
    episodeCard.appendChild(episodeImage);
    episodeCard.appendChild(episodeText);
    // adding an option to the select box for each episode
    selectBox.appendChild(opt);
    return episodeCard;
  }
  // display all the episodes on the screen
  allSeasons.forEach((element) => {
    gridField.appendChild(episode(element));
  });
  // get the search and search-result elements and set the default un-searched text content
  const inputEl = document.getElementById("search");
  const searchResult = document.getElementById("search-result-text");
  searchResult.textContent = "Displaying 73/73 episodes";

  function episodeFilter(event) {
    // clear the screen ready for the search
    gridField.innerHTML = " ";
    console.log(event.key);
    // get the value of text box element
    let inputted = inputEl.value;
    // add the inputted text to the element value
    if (event.key !== "Backspace") {
      inputted = inputted + event.key;
    } else if (event.key === "Backspace" && inputted.length > 0) {
      inputted = inputted.slice(0, -1);
    }
    // create a regex which is equal to the text input and is case insensitive
    const regex = new RegExp(inputted, "i");
    // compare the regex to the episode name and summary content and add the matches to the empty container
    allSeasons.forEach((element) => {
      if (regex.test(element.name) || regex.test(element.summary)) {
        gridField.appendChild(episode(element));
      }
    });
    // display the number of episodes which the search found
    searchResult.textContent = `Displaying ${gridField.childElementCount}/73 episodes`;
  }
  // keypress event that calls the episodeFilter function
  inputEl.addEventListener("keydown", episodeFilter);

  const goToEpisode = document.getElementById("episodeDropDown")
  goToEpisode.addEventListener("change", function() {
    location = this.value;
  })
}
window.onload = setup;
