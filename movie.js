'use strict';

const STORE = {
  searchTerm: "Casablanca",
  data: null,
  apikey: "58adaf1c",
  returnType: 'json'
};

const movieDatabase = 'https://www.omdbapi.com/';

function getDataFromAPI(searchTerm, callback) {
  const query = {
    apikey: STORE.apikey,
    s: searchTerm,
    r: STORE.returnType
  }

  $.getJSON(movieDatabase, query, function(response) {
    STORE.data=response;
    displaySearchResult(STORE);
  });
}

function renderSearchResult(item) {
  return `
  <div class= 'result search-result'>
        <p>${item.Title}</p><button type="button">More Info</button>
    </div>
  `;
}

function displaySearchResult(store) {
  const data = store.data;
  const results = data.Search.map((item) => {
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
  <img src="${result.Poster}">
  <p>${result.Year}</p>
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

