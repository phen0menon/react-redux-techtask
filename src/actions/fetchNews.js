export const asyncFetchNews = (id) => dispatch => {
	dispatch({ type: 'REQUEST_NEWS' });

	fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/news', {
		method: 'GET',
		headers: {
      'Accept': 'application/json',
			'Content-Type': 'application/json'
    }
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
				var apiResponse = {
					status: data.status,
					news: data.data
				};

				dispatch({ type: 'FETCH_NEWS', payload: apiResponse })
		})
}