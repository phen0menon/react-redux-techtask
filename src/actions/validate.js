export const asyncValidateAuth = (email, pwd) => dispatch => {
	dispatch({ type: 'AUTHENTICATION_REQUEST' });

	fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/validate', {
		method: 'POST',
		headers: {
      'Accept': 'application/json',
			'Content-Type': 'application/json'
    },
		body: JSON.stringify({
			email: email,
			password: pwd
		})
	})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data.status === 'ok') {
				var apiResponse = {
					id: data.data.id,
					email: email
				};

				dispatch({ type: 'AUTHENTICATION_SUCCESS', payload: apiResponse })
			} else {
				dispatch({ type: 'AUTHENTICATION_FAIL', payload: data.message })
			}
		})
}