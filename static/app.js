window.onload = function() {

  //  Fetch
  const fetchMovie = async function () {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDQ1YzBlYzEwYjFmZjQzNWYzNmMzMjRkMzFiNjlhNiIsInN1YiI6IjY0NzA4NzVkMTNhMzIwMDEzMzg2MDZiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VD4JrglIFQLt4VGDakFwTMa2u1Zs0Hhixp3VIHyVC4c'
      }
    };
  
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const movies = await response.json();
  
    const data = movies.results;
    console.log(data);
    return data;
  }

  //  Card
  async function movieCard() {
    const movies = await fetchMovie();

    const _id = movies.map( item => item.id );
    const title = movies.map( item => item.title );
    const average = movies.map( item => item.vote_average );
    const image = movies.map( item => item.poster_path );
    const overview = movies.map( item => item.overview );
    const language = movies.map ( item => item.original_language );
    
    for ( let i in movies ) {
      const box = document.getElementById( 'flex-box' );

      const outerDiv = document.createElement( 'div' );
      const innerDiv = document.createElement( 'div' );
      const img = document.createElement( 'img' );
      const h3 = document.createElement( 'h3' );
      const hr = document.createElement( 'hr' );
      const p = document.createElement( 'p' );

      outerDiv.setAttribute( 'class', 'content' );
      outerDiv.setAttribute( 'id', _id[i] );
      img.setAttribute( 'src', `https://image.tmdb.org/t/p/w500/${image[i]}` );
      img.setAttribute( 'alt', title[i] );
      innerDiv.setAttribute( 'class', 'content-text' );
      h3.innerText = title[i];
      p.innerText = overview[i];

      innerDiv.appendChild( h3 );
      innerDiv.appendChild( hr );
      innerDiv.appendChild( p );
      outerDiv.appendChild( img );
      outerDiv.appendChild( innerDiv );
      box.appendChild( outerDiv );
    }

  }

  movieCard();
  
  //  Find
  const frm = document.search;
  frm.addEventListener('submit', findMovie);

  async function findMovie(e) {
    e.preventDefault();
    
    const movies = await fetchMovie();

    const title = movies.map( item => item.title );
    const titleReplace = title.map( (item) => {
      let items = item.replace(/(\s*)/g,'');
      result = items.toLowerCase();
      return result;
    });

    const userMovie = frm.searchInput.value.toLowerCase();
    const matchMovie = titleReplace.filter( (item, i) => {
      return item.includes(userMovie);
    })
    console.log(matchMovie);

    let matchIdx = [];
    for ( let i in matchMovie ) {
      const idx = titleReplace.findIndex( item =>  item === matchMovie[i] );
      matchIdx.push(idx);
    }

    return matchIdx ;    
  }














}
