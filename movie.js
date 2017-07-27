const movieDatabase = 'https://api.themoviedb.org/3/search/person/';

function getDataFromAPI(searchTerm, callback) {
  //gets it
  const query = {
    api_key: "3800867fcd4fc608e503fe922a96c054",
    query: `${searchTerm}`
  }
  $.getJSON(movieDatabase, query, function(response) {
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
  })
})

