import { combineReducers } from 'redux';
import authentication from './auth';
import profile from './profile' 
import news from './news' 

export default combineReducers({
	authentication,
	profile,
	news
})