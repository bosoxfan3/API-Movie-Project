'use strict';

const STORE = {
  searchTerm: 'Casablanca',
  data: null,
  api_key: '3800867fcd4fc608e503fe922a96c054',
  // currentID: null
  currentIndex: null
};

const movieDatabase = 'https://api.themoviedb.org/3/search/movie';

function getDataFromAPI(searchTerm, callback) {
  const query = {
    api_key: STORE.api_key,
    query: searchTerm,
  };

  $.getJSON(movieDatabase, query, function (response) {
    STORE.data = response;
    displaySearchResult(STORE);
  });
}

function renderSearchResult(item) {
  return `
  <li id=${item.id} class= 'search-result'>
         <p>
            <h3><strong>${item.title}</strong></h3><br/>
            <img class='js-movie-poster' src="https://image.tmdb.org/t/p/w500${item.poster_path}"/>
            <button class='js-poster-info' type="button">More Info</button>
           
            <hr/>
        </p>
    </li>
  `;
}

function displaySearchResult(store) {
  const data = store.data;
  console.log(data);
  const results = data.results.map((item) => {
    return renderSearchResult(item);
  });
  $('.js-movie-result-list').html(results);
}

$(function () {
  $('.js-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-input');
    const query = queryTarget.val();
    getDataFromAPI(query, displaySearchResult);
    queryTarget.val('');
    $('.js-start-page').attr('hidden', true);
    $('.js-actor-result-page').removeAttr('hidden');
  });

  $('.js-actor-result-page').on('click', '.js-poster-info', event => {
    event.preventDefault();
    // STORE.currentID = $(event.currentTarget).closest('.search-result').attr('id');
    STORE.currentIndex = $(event.currentTarget).closest('li').index();

    renderMovieInfo(STORE);
    $('.js-actor-result-page').attr('hidden', true);
    $('.js-movie-result-page').removeAttr('hidden');
  });


});



function renderMovieInfo(store) {
  let movie = store.data.results[store.currentIndex];
  let htmlSample = `
  <h2>${movie.title}</h2>
  <p>Score: ${movie.vote_average}</p>
  <p>Release Date: ${movie.release_date}</p>
  <button class="js-mouseover"type='button'>More Info</button>
  <button class='js-start-over' type="reset">Start Over</button>
  <p hidden class="js-movie-overview">${movie.overview}</p>
  `;

  $('.js-movie-result-page').html(htmlSample);
}

$('.js-actor-result-page').on('click', '.js-start-over', event => {
  event.preventDefault();
  $('.js-actor-result-page').attr('hidden', true);
  $('.js-start-page').removeAttr('hidden');
});

$('.js-movie-result-page').on('click', '.js-start-over', event => {
  event.preventDefault();
  $('.js-movie-result-page').attr('hidden', true);
  $('.js-start-page').removeAttr('hidden');
});


$('.js-movie-result-page').on('mouseover','.js-mouseover', event => {
  
  let movie = STORE.data.results[STORE.currentIndex];
  console.log(`${movie}`);
  $('.js-movie-overview').removeAttr('hidden');
});

$('.js-movie-result-page').on('mouseout','.js-mouseover', event => {
  
  let movie = STORE.data.results[STORE.currentIndex];
  console.log(`${movie}`);
  $('.js-movie-overview').attr('hidden',true);
});