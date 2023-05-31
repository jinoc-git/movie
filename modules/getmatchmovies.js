export function getMatchMovies (titlesReplace, matchMovieTitles, movies) {
  let matchIdx = [];
  for (let i in matchMovieTitles) {
    let idx = titlesReplace.findIndex((item) => item === matchMovieTitles[i]);
    matchIdx.push(idx);
  }

  let result = [];
  for (let i of matchIdx) {
    result.push(movies[i]);
  }

  return result;
}