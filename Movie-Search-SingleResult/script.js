const movieData = document.getElementById('movie-data');
const input = document.getElementById('movie-search');
const key = '22ec02ff';
const defaultTitle = 'ozark';
const url = `https://www.omdbapi.com/?apikey=${key}&t=`;

const movieDataTpl = (movie) => {
  let actors = movie.Actors.split(',');
  
  return `
    <div class="movie__poster">
      <span class="movie__poster--fill">
        <img src="${movie.Poster}" />
      </span>
      <span class="movie__poster--featured">
        <img src="${movie.Poster}" />
      </span>
    </div>
    <div class="movie__details">
      <h2 class="movie__title">${movie.Title}</h2>
      <ul class="movie__tags list--inline">
        <li class="movie__rated">${movie.Rated}</li>
        <li class="movie__year">${movie.Year}</li>
        <li class="movie__year">${movie.Genre}</li>
      </ul>
      <p class="movie__plot">${movie.Plot}</p>
      <div class="movie__credits">
        <p><strong>Written by:</strong> ${movie.Writer}</p>
        <p><strong>Directed by:</strong> ${movie.Director}</p>
        <p><strong>Starring:</strong></p>
        <ul class="movie__actors list--inline">
          ${actors.map(actor => `<li>${actor}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

const noResultsTpl = () => {
  return `
    <div class="movie__no-results">
      <h2>No results</div>
    </div>
  `;
};

const findMovie = (title) =>  {
  fetch(url + title, 
  {
  method: 'get',
  }).then(function(res) 
  {
    return res.json();
  }).then(function(data) 
  {
    movieData.innerHTML = movieDataTpl(data);
  }).catch(function(err) 
  {
  movieData.innerHTML = noResultsTpl();
  });
}

findMovie(defaultTitle);

input.addEventListener('keypress', (e) => {
  if (e.key === "Enter" && input.value) findMovie(input.value); 
  //press enter and take input
});
