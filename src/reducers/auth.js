const initialState = {
	type: null,
	id: null,
	email: null,
	authorized: false,
	error: null,
	loading: false
}

export default function authentication(state = initialState, action) {
	switch (action.type) {
		case 'AUTHENTICATION_REQUEST':
			return Object.assign({}, state, {
				type: null,
				id: null,
				authorized: false,
				error: null,
				loading: true
			})
		case 'AUTHENTICATION_SUCCESS': 
			localStorage.setItem('isAuthorized', true);
			localStorage.setItem('id', action.payload.id);

			return Object.assign({}, state, {
				type: action.type,
				id: action.payload.id,
				email: action.payload.email,
				authorized: true,
				loading: false
			});
		case 'AUTHENTICATION_FAIL':
			return Object.assign({}, state, {
				type: action.type,
				id: null,
				email: null,
				error: action.payload,
				loading: false
			});
		default:
			return state
	}
}