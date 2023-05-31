const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDQ1YzBlYzEwYjFmZjQzNWYzNmMzMjRkMzFiNjlhNiIsInN1YiI6IjY0NzA4NzVkMTNhMzIwMDEzMzg2MDZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VD4JrglIFQLt4VGDakFwTMa2u1Zs0Hhixp3VIHyVC4c",
  },
};
window.onload = function () {
  //  Fetch
  const fetchMovie = async function () {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      OPTIONS
    );
    const movies = await response.json();

    const data = movies.results;

    return data;
  };

  //  Card
  async function listMovieCard(arr) {
    const movies = await fetchMovie();

    const _id = movies.map((item) => item.id);
    const title = movies.map((item) => item.title);
    const image = movies.map((item) => item.poster_path);
    const overview = movies.map((item) => item.overview);

    const box = document.getElementById("flex-box");

    if (!arr) {
      for (let i in movies) {
        const outerDiv = document.createElement("div");
        const innerDiv = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const hr = document.createElement("hr");
        const p = document.createElement("p");

        outerDiv.setAttribute("class", "content");
        outerDiv.setAttribute("id", _id[i]);
        img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${image[i]}`);
        img.setAttribute("alt", title[i]);
        innerDiv.setAttribute("class", "content-text");
        h3.innerText = title[i];
        p.innerText = overview[i];

        innerDiv.appendChild(h3);
        innerDiv.appendChild(hr);
        innerDiv.appendChild(p);
        outerDiv.appendChild(img);
        outerDiv.appendChild(innerDiv);
        box.appendChild(outerDiv);
      }
    } else {
      box.innerHTML = "";

      for (let num of arr) {
        const outerDiv = document.createElement("div");
        const innerDiv = document.createElement("div");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const hr = document.createElement("hr");
        const p = document.createElement("p");

        outerDiv.setAttribute("class", "content");
        outerDiv.setAttribute("id", _id[num]);
        img.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500/${image[num]}`
        );
        img.setAttribute("alt", title[num]);
        innerDiv.setAttribute("class", "content-text");
        h3.innerText = title[num];
        p.innerText = overview[num];

        innerDiv.appendChild(h3);
        innerDiv.appendChild(hr);
        innerDiv.appendChild(p);
        outerDiv.appendChild(img);
        outerDiv.appendChild(innerDiv);
        box.appendChild(outerDiv);
      }
    }
  }

  listMovieCard();

  //  Find
  const frm = document.search;
  frm.addEventListener("submit", findMovie);

  async function findMovie(e) {
    e.preventDefault();

    const movies = await fetchMovie();

    const title = movies.map((item) => item.title);
    const titleReplace = title.map((item) => {
      let items = item.replace(/(\s*)/g, "");
      result = items.toLowerCase();
      return result;
    });

    const userMovie = frm.searchInput.value.toLowerCase();
    const matchMovie = titleReplace.filter((item, i) => {
      return item.includes(userMovie);
    });

    let matchIdx = [];
    for (let i in matchMovie) {
      const idx = titleReplace.findIndex((item) => item === matchMovie[i]);
      matchIdx.push(idx);
    }

    if (matchIdx.length === 0) {
      const box = document.getElementById("flex-box");
      box.innerText = "찾으시는 영화가 없습니다. 검색어를 확인해 주세요.";
    } else {
      listMovieCard(matchIdx);
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
};
