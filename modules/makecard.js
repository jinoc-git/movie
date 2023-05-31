export function makeCard(movies) {
  for (let i in movies) {
    const { id, title, poster_path, overview } = movies[i];

    const $box = document.getElementById("flex-box");
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const hr = document.createElement("hr");
    const p = document.createElement("p");

    outerDiv.setAttribute("class", "content");
    outerDiv.setAttribute("id", id);
    img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${poster_path}`);
    img.setAttribute("alt", title);
    innerDiv.setAttribute("class", "content-text");
    h3.innerText = title;
    p.innerText = overview;

    innerDiv.appendChild(h3);
    innerDiv.appendChild(hr);
    innerDiv.appendChild(p);
    outerDiv.appendChild(img);
    outerDiv.appendChild(innerDiv);
    $box.appendChild(outerDiv);
  }
}