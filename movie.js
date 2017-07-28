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
  }).css('border', '10px solid green');


});



function renderMovieInfo(store) {
let movie= store.data.results[store.currentIndex];
  let htmlSample = `
  <h2>${movie.title}</h2>
  <p>${movie.vote_average}</p>
  <p>${movie.release_date}</p>
  <button type='button'>More Info</button>
  `;
  $('.js-movie-result-page').html(htmlSample);
}




// function resetSearch(event) {
//   $('js-reset').click(event => {
//     event.preventDefault();
//     $('.js-movie-result-page').attr('hidden', true);
//     $('.js-start-page').removeAttr('hidden');

//   });
// }

// $('.js-start-over').click(event => {
//   event.preventDefault();
//   $('.js-actor-result-page').removeAttr('hidden');
//   $('.js-start-page').attr('hidden', true);
// });

