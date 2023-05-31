import { OPTIONS } from "./options.js";
import { makeCard } from "./makecard.js";
import { getMatchMovies } from "./getmatchmovies.js";

//  Fetch
export const fetchMovie = async function () {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    OPTIONS
  );
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

//  reload
const h1 = document.querySelector(".header h1");
h1.addEventListener("click", () => {
  window.location.reload();
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

//  Modal click
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

  makeModal(contentId);
});

//  Modal make
const body = document.querySelector("body");

async function makeModal(num) {
  const movies = await fetchMovie();
  const clickMovie = movies.find((item) => item.id === parseInt(num));

  const { title, vote_average, poster_path, overview, original_language } =
    clickMovie;

  const modal = document.querySelector(".overlay");
  const modalTitle = document.querySelector(".modal-body h3");
  const modalAverage = document.querySelector(".average");
  const modalLanguage = document.querySelector(".language");
  const modalImg = document.querySelector(".modal-content img");
  const modalOverview = document.querySelector(".modal-content p");

  modalTitle.innerText = title;
  modalAverage.innerText = vote_average;
  modalLanguage.innerText = original_language;
  modalImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${poster_path}`
  );
  modalImg.setAttribute("alt", title);
  modalOverview.innerText = overview;

  modal.classList.toggle("active");
  body.classList.toggle("notScroll");
  alert(`id : ${num}`);
}

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

//  Modal close

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
