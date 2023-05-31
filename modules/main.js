import { URL } from "./fetchurl.js";
import { OPTIONS } from "./options.js";
import { makeCard } from "./makecard.js";
import { getMatchMovies } from "./getmatchmovies.js";
import { setModal } from "./setmodal.js";

//  Fetch
const fetchMovie = async function () {
  const response = await fetch(URL, OPTIONS);
  const data = await response.json();
  const movies = data.results;
  return movies;
};

//  List card
async function listMovieCard(arr) {
  const movies = await fetchMovie();
  if (!arr) {
    makeCard(movies);
  } else {
    const box = document.getElementById("flex-box");
    box.innerHTML = "";
    makeCard(arr);
  }
}
listMovieCard();

//  Search movie
const frm = document.search;
frm.addEventListener("submit", findMovie);
async function findMovie(e) {
  e.preventDefault();
  const movies = await fetchMovie();
  const titles = movies.map((item) => item.title);
  const titlesReplace = titles.map((item) => {
    let items = item.replace(/(\s*)/g, "");
    let result = items.toLowerCase();
    return result;
  });

  const userMovieTitle = frm.searchInput.value.toLowerCase();
  const matchMovieTitles = titlesReplace.filter((item, i) => {
    return item.includes(userMovieTitle);
  });

  const matchMovies = getMatchMovies(titlesReplace, matchMovieTitles, movies);
  if (matchMovies.length === 0) {
    const box = document.getElementById("flex-box");
    box.innerText = "찾으시는 영화가 없습니다. 검색어를 확인해 주세요.";
  } else {
    listMovieCard(matchMovies);
  }
}

//  Click logo
const h1 = document.querySelector(".header h1");
h1.addEventListener("click", () => {
  window.location.reload();
});

//  Click content
const flexBox = document.getElementById("flex-box");
flexBox.addEventListener("click", (e) => {
  let content = e.target.parentNode;
  if (content.className !== "content") {
    content = content.parentNode;
  }

  const contentId = content.getAttribute("id");
  if (contentId === null || contentId === undefined) {
    return false;
  }

  openModal(contentId);
});

//  Open modal
const body = document.querySelector("body");
async function openModal(num) {
  const movies = await fetchMovie();
  const clickMovie = movies.find((item) => item.id === parseInt(num));
  alert(`id : ${num}`);

  setModal(clickMovie);

  const modal = document.querySelector(".overlay");
  modal.classList.toggle("active");
  body.classList.toggle("notScroll");
}

//  Close modal
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", (e) => {
  if (e.target.className === "overlay") {
    overlay.classList.toggle("active");
    body.classList.toggle("notScroll");
  }
  _searchInput.focus();
});
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", () => {
  overlay.classList.toggle("active");
  body.classList.toggle("notScroll");
  _searchInput.focus();
});

//  Top btn
const topBtn = document.querySelector("aside nav button");
topBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//  focus
const searchBtn = document.querySelector(".submitBtn");
const _searchInput = document.getElementById("search-input");
_searchInput.addEventListener("focus", () => {
  _searchInput.classList.toggle("btn-focus");
});
_searchInput.addEventListener("blur", () => {
  _searchInput.classList.toggle("btn-focus");
});
searchBtn.addEventListener("focus", () => {
  searchBtn.classList.toggle("btn-focus");
});
searchBtn.addEventListener("blur", () => {
  searchBtn.classList.toggle("btn-focus");
});
topBtn.addEventListener("focus", () => {
  topBtn.classList.toggle("btn-focus");
});
topBtn.addEventListener("blur", () => {
  topBtn.classList.toggle("btn-focus");
});