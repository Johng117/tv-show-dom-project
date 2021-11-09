const cardField = document.getElementById("card-container");
const showList = getAllShows();
const selectBox = document.getElementById("episodeDropDown");
const goToEpisode = document.getElementById("episodeDropDown");
let inputEl = document.getElementById("search");
const oneEp = getOneEpisode();

// function that takes a show ID number and fetches the episodes for that show

// function episodesGetter(showId) {
//   const apiEndpoint = `https://api.tvmaze.com/shows/${showId}/episodes`;
//   fetch(apiEndpoint)
//     .then((response) => {
//       if (response.status === 200 || response.status === 404) {
//         console.log(response);
//         return response.json();
//       }
//       throw `${response.status} ${response.statusText}`;
//     })
//     .then((episodes) => {
//       makePageForEpisodes(episodes);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// function to create individual cards

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
  optionCreator(obj);
  let titleImageBox = document.createElement("div");
  titleImageBox.id = "title-img-box";
  titleImageBox.appendChild(titleBox);
  titleImageBox.appendChild(episodeImage);
  episodeCard.appendChild(titleImageBox);
  episodeCard.appendChild(episodeText);
  return episodeCard;
}

// function one(obj) {

//   let epi = obj;
//   cardField.appendChild(episode(epi));
//   const numberOfEpisodes = document.getElementById("episode-number-text");
//   numberOfEpisodes.textContent = `Displaying ${cardField.children.length}/73 episodes`;
// }

// one(oneEp);

function optionCreator(obj) {
  const opt = document.createElement("option");
  opt.value = obj.name;
  opt.text = `S0${obj.season}${(obj.number < 10 ? "0" : "") + obj.number} - ${
    obj.name
  }`;
  selectBox.appendChild(opt);
}

// function that adds the names of the shows to the relevant select box

function shows() {
  showList.forEach((show) => {
    let showSelector = document.getElementById("show-select");
    let showName = document.createElement("option");
    showName.text = show.name;
    showName.value = show.id;
    showSelector.appendChild(showName);
  });
}

// }

let showSelect = document.getElementById("show-select");
showSelect.addEventListener("change", function () {
  let optionList = document.getElementById("episodeDropDown");
  optionList.innerHTML = " ";
  cardField.innerHTML = " ";
  episodesGetter(this.value);
});

function makePageForEpisodes(episodes) {
  let allSeasons = episodes;
  const numberOfEpisodes = document.getElementById("episode-number-text");

  // console.log(allSeasons);
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
// display all the episodes on the screen

// function to build a show card

function showCard(obj) {
  let tvShowCard = document.createElement("article");
  tvShowCard.className = "tv-show-article";
  tvShowCard.id = obj.id;
  const showTitleBox = document.createElement("div");
  showTitleBox.id = "showTitleBox";
  showTitleBox.innerHTML = `${obj.name}`;
  const showImage = document.createElement("img");
  showImage.src = `${obj.image["medium"]}`;
  showImage.id = "showImageBox";
  const showSummary = document.createElement("div");
  showSummary.id = "summaryBox";
  const summaryText = obj.summary.slice(3, -4);
  showSummary.innerHTML = summaryText;

  tvShowCard.appendChild(showTitleBox);
  tvShowCard.appendChild(showImage);
  tvShowCard.appendChild(showSummary);
  return tvShowCard;
}

// function showField() {
//   let singleShow = getOneShow();
//   console.log(singleShow);
//   let showContainer = document.getElementById("show-container");
//   showContainer.appendChild(showCard(singleShow));
// }

// showField();

// get the search and search-result elements and set the default un-searched text content

function setup() {
  let defaultShow = 82;
  shows();
  // makePageForEpisodes(episodeList);
  episodesGetter(defaultShow);
}

window.onload = setup;
