import { URL } from "./fetchurl.js";
import { OPTIONS } from "./options.js";
import { makeCard } from "./makecard.js";
import { setModal } from "./setmodal.js";

//  Fetch
async function fetchMovie() {
  const response = await fetch(URL, OPTIONS);
  const data = await response.json();
  const movies = data.results;
  return movies;
}

//  List card
async function listMovieCard(arr) {
  if (arr) {
    const $box = document.getElementById("flex-box");
    $box.innerHTML = "";
    makeCard(arr);
  } else {
    const movies = await fetchMovie();
    makeCard(movies);
  }
}
listMovieCard();

//  Search movie
const $frm = document.search;
$frm.addEventListener("submit", findMovie);
async function findMovie(e) {
  e.preventDefault();
  const movies = await fetchMovie();

  const userInput = $frm.searchInput.value.toLowerCase();
  const userMovieTitle = userInput.replace(/(\s*)/g, "");
  const matchMovies = movies.filter((item) => {
    let titles = item.title.toLowerCase().replace(/(\s*)/g, "");
    return titles.includes(userMovieTitle);
  });

  if (matchMovies.length === 0) {
    const $box = document.getElementById("flex-box");
    $box.innerText = "찾으시는 영화가 없습니다. 검색어를 확인해 주세요.";
  } else {
    listMovieCard(matchMovies);
  }
}

//  Click logo
const $h1 = document.querySelector(".header h1");
$h1.addEventListener("click", () => {
  window.location.reload();
});

//  Click content
const $flexBox = document.getElementById("flex-box");
$flexBox.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "flex-box") {
    return false;
  }

  let content = e.target.parentNode;
  if (content.className !== "content") {
    content = content.parentNode;
  }
  const contentId = content.getAttribute("id");
  openModal(contentId);
});

//  Open modal
const $body = document.querySelector("body");
async function openModal(num) {
  const movies = await fetchMovie();
  const clickMovie = movies.find((item) => item.id === parseInt(num));
  alert(`id : ${num}`);

  setModal(clickMovie);

  const $modal = document.querySelector(".overlay");
  $modal.classList.toggle("active");
  $body.classList.toggle("notScroll");
}

//  Close modal
const $overlay = document.querySelector(".overlay");
const $_searchInput = document.getElementById("search-input");
$overlay.addEventListener("click", (e) => {
  if (e.target.className === "overlay") {
    $overlay.classList.toggle("active");
    $body.classList.toggle("notScroll");
  }
  $_searchInput.focus();
});
const $closeBtn = document.querySelector(".close");
$closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  $overlay.classList.toggle("active");
  $body.classList.toggle("notScroll");
  $_searchInput.focus();
});

//  Top btn
const $topBtn = document.querySelector("aside nav button");
$topBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//  Focus input
const $searchBtn = document.querySelector(".submitBtn");
$_searchInput.addEventListener("focus", () => {
  $_searchInput.classList.toggle("btn-focus");
});
$_searchInput.addEventListener("blur", () => {
  $_searchInput.classList.toggle("btn-focus");
});
$searchBtn.addEventListener("focus", () => {
  $searchBtn.classList.toggle("btn-focus");
});
$searchBtn.addEventListener("blur", () => {
  $searchBtn.classList.toggle("btn-focus");
});
$topBtn.addEventListener("focus", () => {
  $topBtn.classList.toggle("btn-focus");
});
$topBtn.addEventListener("blur", () => {
  $topBtn.classList.toggle("btn-focus");
});
