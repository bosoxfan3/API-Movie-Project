const movieDatabase = 'https://api.themoviedb.org/3/search/person/';

function getDataFromAPI(searchTerm, callback) {
  //gets it
  const query = {
    api_key: "3800867fcd4fc608e503fe922a96c054",
    query: `${searchTerm}`
  }
  $.getJSON(movieDatabase, query, function (response) {
    displaySearchResult(response);
  });
}

function renderSearchResult(result) {
  return `
  <div class= 'result search-result'>
        <p>${result.name}</p>
    </div>
  `;
}

function displaySearchResult(data) {
  console.log(data);
  console.log(data.items);
  const results = data.items.map((item) => {
    return renderSearchResult(item);
  });
  $('.js-actor-result-page').html(results);
}

$(function watchSubmit() {
  $('.js-form').submit(event => {
    event.preventDefault();
    console.log('working');
    const queryTarget = $(event.currentTarget).find('.js-input');
    const query = queryTarget.val();
    getDataFromAPI(queryTarget, displaySearchResult);

    console.log(query);
    queryTarget.val("");
    $('.js-start-page').attr('hidden', true);
    $('.js-actor-result-page').removeAttr('hidden');
  })
})

function renderMovieInfo(result) {
  return `
  <img src="https://image.tmdb.org/t/p/w1280${result.known_for.poster_path}">
  <p>${result.known_for.title}</p>
  <p>${result.known_for.vote_average}</p>
  <button type="button" class="js-more-info">More Info</button>
  `;
}

function displayMovieInfo(data) {
  const results = data.items.map((item) => {
    return renderMovieInfo(item);
  });
  $('.js-movie-result-page').html(results);
}

function resetSearch(event){
  $('js-reset').click(event => {
    event.preventDefault();
    $('.js-movie-result-page').attr('hidden', true);
    $('.js-start-page').removeAttr('hidden');
    
  });
}

