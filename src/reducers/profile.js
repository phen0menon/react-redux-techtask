const initialState = {
	userId: null,
	city: null,
	languages: [],
	social: [],
	loading: false,
	status: null
}

export default function profile(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_PROFILE_INFO':
			return Object.assign({}, state, {
				userId: null,
				city: null,
				languages: [],
				social: [],
				loading: true,
				status: null
			})
		case 'FETCH_PROFILE_INFO': 
			return Object.assign({}, state, {
				status: action.payload.status,
				userId: action.payload.userId,
				city: action.payload.city,
				languages: action.payload.languages,
				social: action.payload.social,
				loading: false
			});
		default:
			return state;
	}
}