const cardField = document.getElementById("card-container");
const showContainer = document.getElementById("show-container");
const listOfShows = document.getElementById("series-select");
const showList = getAllShows();
const selectBox = document.getElementById("episodeDropDown");
const goToEpisode = document.getElementById("episodeDropDown");
let inputEl = document.getElementById("search");


// function that takes a show ID number and fetches the episodes for that show

function episodesGetter(showId) {
  const apiEndpoint = `https://api.tvmaze.com/shows/${showId}/episodes`;
  fetch(apiEndpoint)
    .then((response) => {
      if (response.status === 200 || response.status === 404) {
        console.log(response);
        return response.json();
      }
      throw `${response.status} ${response.statusText}`;
    })
    .then((episodes) => {
      makePageForEpisodes(episodes);
    })
    .catch((error) => {
      console.log(error);
    });
}

// function to create individual cards

function episode(obj) {
  let episodeCard = document.createElement("article");
  episodeCard.className = "article";
  episodeCard.id = obj.id;
  let titleImageBox = document.createElement("div");
  // create container for title name and episode/series number

  const titleBox = document.createElement("div");
  titleBox.id = "titleBox";
  titleBox.innerHTML = `${obj.name} - S0${obj.season}0${obj.number}`;
  titleImageBox.appendChild(titleBox);
  // create image element
  if (obj.image !== null) {
    const episodeImage = document.createElement("img");
    episodeImage.src = `${obj.image["medium"]}`;
    episodeImage.id = "imageBox";
    titleImageBox.appendChild(episodeImage);
  }
  // create text box element
  const episodeText = document.createElement("div");
  episodeText.id = "textBox";
  // format episode summary text
  const innerText = obj.summary.slice(3, -4);
  episodeText.innerHTML = innerText;
  optionCreator(obj);
  titleImageBox.id = "title-img-box";
  episodeCard.appendChild(titleImageBox);
  episodeCard.appendChild(episodeText);
  return episodeCard;
}



function optionCreator(obj) {
  const opt = document.createElement("option");
  opt.value = obj.name;
  opt.text = `S0${obj.season}${(obj.number < 10 ? "0" : "") + obj.number} - ${
    obj.name
  }`;
  selectBox.appendChild(opt);
}

function optionSelectReset() {
  const opt = document.createElement("option");
  opt.value = "All Shows";
  opt.text = "All Shows";
  return opt;
}

// function that adds the names of the shows to the relevant select box

function shows() {
  showList
    .sort(function (a, b) {
      let aName = a.name.toUpperCase();
      let bName = b.name.toUpperCase();
      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
    })
    .forEach((show) => {
      let showSelector = document.getElementById("show-select");
      let showName = document.createElement("option");
      showName.text = show.name;
      showName.value = show.id;
      showSelector.appendChild(showName);
    });
}



let showSelect = document.getElementById("show-select");
showSelect.addEventListener("change", function () {
  let optionList = document.getElementById("episodeDropDown");
  optionList.innerHTML = " ";
  cardField.innerHTML = " ";
  episodesGetter(this.value);
});


// function that displays the episodes for the chosen show

function makePageForEpisodes(episodes) {
  let allSeasons = episodes;
  const numberOfEpisodes = document.getElementById("episode-number-text");
  allSeasons.forEach((element) => {
    cardField.appendChild(episode(element));
  });
  numberOfEpisodes.textContent = `Displaying ${cardField.children.length}/${allSeasons.length} episodes`;

  goToEpisode.addEventListener("change", function () {
    cardField.innerHTML = " ";
    allSeasons.forEach((element) => {
      if (element.name === this.value) {
        cardField.appendChild(episode(element));
      }
    });
    numberOfEpisodes.textContent = `Displaying ${cardField.children.length}/${allSeasons.length} episodes`;
  });

  inputEl.addEventListener("input", function (event) {
    cardField.innerHTML = "";
    let inputted = event.target.value.toLowerCase();
    allSeasons.forEach((element) => {
      let lowerName = element.name.toLowerCase();
      let lowerSummary = element.summary.toLowerCase();
      if (lowerName.includes(inputted) || lowerSummary.includes(inputted)) {
        cardField.appendChild(episode(element));
      }
    });
    numberOfEpisodes.textContent = `Displaying ${cardField.children.length}/${allSeasons.length} episodes`;
  });
}

// function to build a show card

function showCard(obj) {
  let tvShowCard = document.createElement("article");
  tvShowCard.className = "tv-show-article";
  tvShowCard.id = obj.id;

  const showTitleBox = document.createElement("div");
  showTitleBox.id = "showTitleBox";

  const showHeading = document.createElement("button");
  showHeading.id = "button";
  showHeading.textContent = `${obj.name}`;
  showTitleBox.appendChild(showHeading);
  let imageSummaryBox = document.createElement("div");
  imageSummaryBox.className = "image-summary";

  if (obj.image !== null) {
    let showImage = document.createElement("img");
    showImage.src = obj["image"].medium;
    showImage.id = "showImageBox";
    imageSummaryBox.appendChild(showImage);
  }
  const showSummary = document.createElement("div");
  showSummary.id = "summaryBox";
  const summaryText = obj.summary.slice(3, -4);
  showSummary.innerHTML = summaryText;

  let showRating = document.createElement("p");
  showRating.textContent = `Rated: ${obj.rating.average}`;
  let showGenres = document.createElement("p");
  showGenres.textContent = `Genres: ${obj.genres.join(" || ")}`;
  let showStatus = document.createElement("p");
  showStatus.textContent = `Status: ${obj.status}`;
  let showRuntime = document.createElement("p");
  showRuntime.textContent = `Runtime: ${obj.runtime}`;
  let infoContainer = document.createElement("div");
  infoContainer.className = "info-container";
  showOptions(obj);
  infoContainer.appendChild(showRating);
  infoContainer.appendChild(showGenres);
  infoContainer.appendChild(showStatus);
  infoContainer.appendChild(showRuntime);
  // imageSummaryBox.appendChild(showImage);
  imageSummaryBox.appendChild(showSummary);
  imageSummaryBox.appendChild(infoContainer);
  tvShowCard.appendChild(showTitleBox);
  tvShowCard.appendChild(imageSummaryBox);
  return tvShowCard;
}

// a function that adds an option for each show to the select box 

function showOptions(obj) {
  const showOption = document.createElement("option");
  showOption.value = obj.name;
  showOption.text = `${obj.name}`;
  listOfShows.appendChild(showOption);
}

function showField() {
  showList.sort(function (a, b) {
    let aName = a.name.toUpperCase();
    let bName = b.name.toUpperCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });

  const showContainer = document.getElementById("show-container");
  const listOfShows = document.getElementById("series-select");
  let reset = optionSelectReset();
  listOfShows.appendChild(reset);
  showList.forEach((element) => {
    showContainer.appendChild(showCard(element));
  });

  let showEpisodes = document.getElementById("show-container");
  showEpisodes.addEventListener("click", function (event) {
    let clicked = event.target;
    if (clicked.id === "button") {
      const showContainer = document.getElementById("show-container");
      showContainer.innerHTML = " ";
      document.getElementById("show-search-bar").style.display = "none";
      document.getElementById("search-bar").style.display = "flex";
      document.getElementById("card-container").style.display = "flex";

      let showPick = showList.filter((element) => {
        return element.name === event.target.textContent;
      });
      episodesGetter(`${showPick[0].id}`);
    }
  });

  let showInput = document.getElementById("series-search");
  showInput.addEventListener("input", function (event) {
    showContainer.innerHTML = "";
    let inputted = event.target.value.toLowerCase();
    console.log(inputted);
    showList.forEach((element) => {
      let lowerShowName = element.name.toLowerCase();
      let lowerShowSummary = element.summary.toLowerCase();
      if (
        lowerShowName.includes(inputted) ||
        lowerShowSummary.includes(inputted)
      ) {
        showContainer.appendChild(showCard(element));
      }
    });
  });
}
// const goToShow = document.getElementById("series-select");
listOfShows.addEventListener("change", function () {
  const showContainer = document.getElementById("show-container");
  showContainer.innerHTML = " ";
  showList.forEach((element) => {
    if (element.name === this.value) {
      showContainer.appendChild(showCard(element));
    }
  });
  if (this.value === "All Shows") {
    showList.forEach((element) => {
      showContainer.appendChild(showCard(element));
    });
  }
});

// get the search and search-result elements and set the default un-searched text content

function setup() {
  showField();
  shows();
}

window.onload = setup;
