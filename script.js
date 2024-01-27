// add focus on the search bar
const searchInput = document.getElementById("search-input");

const focusOnSearchBar = searchInput.focus();

document.addEventListener("DOMContentLoaded", focusOnSearchBar);

// handle serach artists
const resultPlaylist = document.getElementById("result-playlist");
const resultArtistis = document.getElementById("result-artists");
const noResults = document.getElementById("no-results");

const addDivTagForArtistContent = () => {
  const divTag = document.createElement("div");
  divTag.classList.add("offer__list-item");
  divTag.id = "artist-content";
  resultArtistis.appendChild(divTag);

  return divTag;
};

const displayResults = (results, resultArtistis) => {
  resultPlaylist.classList.add("hidden");

  let artistContent = document.getElementById("artist-content");

  let divTag = null;

  if (artistContent === undefined || artistContent === null) {
    divTag = addDivTagForArtistContent();
  } else {
    divTag = artistContent;
  }

  if (results.length === 0) {
    noResults.classList.remove("hidden");
    resultArtistis.removeChild(resultArtistis.firstChild);
  } else {
    noResults.classList.add("hidden");
  }

  results.forEach((result) => {
    const divArtist = document.createElement("div");
    const divImg = document.createElement("div");
    const imgArtistImg = document.createElement("img");
    const divContent = document.createElement("div");
    const pArtistName = document.createElement("p");
    const pArtistDefault = document.createElement("p");

    divArtist.classList.add("artist-card");
    
    divImg.classList.add("div-img");

    imgArtistImg.classList.add("artist-img");
    imgArtistImg.src = result.urlImg;

    divContent.classList.add("div-content")

    pArtistName.classList.add("artist-name");
    pArtistName.innerHTML = result.name;

    pArtistDefault.classList.add("artist-default");
    pArtistDefault.innerHTML = "Artist";

    divTag.appendChild(divArtist);
    divArtist.appendChild(divImg);
    divImg.appendChild(imgArtistImg);
    divArtist.appendChild(divContent);
    divContent.appendChild(pArtistName);
    divContent.appendChild(pArtistDefault);

    resultArtistis.classList.remove("hidden");
  });
};

const fetchArtistsByName = (artistName, resultArtistis) => {
  const apiArtists = `http://localhost:3000/artists?name_like=${artistName}`;

  resultArtistis.removeChild(resultArtistis.firstChild);

  fetch(apiArtists)
    .then((response) => response.json())
    .then((results) => displayResults(results, resultArtistis));
};

const onChangeSearchBar = () => {
  const searchTerm = searchInput.value.toLowerCase();

  addDivTagForArtistContent();

  if (searchTerm !== "" && searchTerm !== undefined) {
    resultPlaylist.classList.add("hidden");
    resultArtistis.classList.remove("hidden");
    fetchArtistsByName(searchTerm, resultArtistis);
  } else {
    resultPlaylist.classList.remove("hidden");
    resultArtistis.classList.add("hidden");
    noResults.classList.add("hidden");
    resultArtistis.removeChild(resultArtistis.firstChild);
  }

  return;
};

document.addEventListener("input", onChangeSearchBar);
