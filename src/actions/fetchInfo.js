export const asyncFetchProfileInformation = (id) => dispatch => {
	dispatch({ type: 'REQUEST_PROFILE_INFO' });

	fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/user-info/' + id, {
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
					city: data.data.city,
					userId: data.data.userId,
					languages: data.data.languages,
					social: data.data.social
				};

				dispatch({ type: 'FETCH_PROFILE_INFO', payload: apiResponse })
		})
}