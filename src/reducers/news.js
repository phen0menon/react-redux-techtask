const initialState = {
	loading: false,
	news: []
}

export default function authentication(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_NEWS':
			return Object.assign({}, state, {
				loading: true,
				news: []
			})
		case 'FETCH_NEWS': 
			return Object.assign({}, state, {
				loading: false,
				news: action.payload.news
			});
		default:
			return state
	}
}