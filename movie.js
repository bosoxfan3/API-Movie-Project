'use strict';

const STORE = {
  searchTerm: 'Casablanca',
  data: null,
  api_key: '3800867fcd4fc608e503fe922a96c054',
};

const movieDatabase = 'https://api.themoviedb.org/3/search/movie';

function getDataFromAPI(searchTerm, callback) {
  const query = {
    api_key: STORE.api_key,
    query: searchTerm,
  };

  $.getJSON(movieDatabase, query, function(response) {
    STORE.data=response;
    displaySearchResult(STORE);
  });
}

function renderSearchResult(item) {
  return `
  <div class= 'result search-result'>
         <p>
            <h3><strong>${item.title}</strong></h3><br/>
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}"/>
            <hr/>
        </p>
    </div>
  `;
}

function displaySearchResult(store) {
  const data = store.data;
  console.log(data);
  const results = data.results.map((item) => {
    return renderSearchResult(item);
  });
  $('.js-actor-result-page').html(results);
}

$(function watchSubmit() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-input');
    const query = queryTarget.val();
    getDataFromAPI(query, displaySearchResult);
    queryTarget.val("");
    $('.js-start-page').attr('hidden', true);
    $('.js-actor-result-page').removeAttr('hidden');
  });
});

function renderMovieInfo(result) {
  return `
  <h2>${result.title}</h2>
  <p>${result.vote_average}</p>
  <p>${result.release_date}</p>
  <button type='button'>More Info</button>
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

