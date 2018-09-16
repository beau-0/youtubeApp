const endpoint_url = 'https://www.googleapis.com/youtube/v3/search';

// what is "in:name"?
function dataPull(searchTerm, callback) {
	const query= 
	{
		key: 'AIzaSyAnqIGiOT24euBUX03Fh7hxQZIQ7WJJsTk',
		q: `${searchTerm}`,
		maxResults: 10,
		part: 'snippet'
	}
	$.getJSON(endpoint_url, query, callback);
}
 
 
function renderResult(result) { 
	return `
    <div>
      <h2 class="videoTitle">${result.snippet.title}</h2>
      <p>Description: <span class="x">${result.snippet.description}</span></p>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img class="thumb" src="${result.snippet.thumbnails.high.url}"/>
      <a href="https://www.youtube.com/channel/${result.snippet.channelId}"><p>check out the channel</p>
    </div> 
  `;
} 


function displayData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  // console.log(results);
  $('.search-results').html(results);
}


function watchSubmit() {
	$('.search-form').submit(event => {
		event.preventDefault();
		const searchEntry = $(event.currentTarget).find('.query-box');
		const searchTerm = searchEntry.val();

    $('.results-heading').show();
    $('.results-heading').html("Showing 10 most popular results:");
		searchEntry.val("");
		dataPull(searchTerm, displayData);
	}
  );
}

$(watchSubmit);