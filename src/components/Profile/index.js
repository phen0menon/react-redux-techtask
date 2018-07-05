import React, { Component } from 'react';
import { connect } from 'react-redux';
import {asyncFetchProfileInformation} from '../../actions/fetchInfo';
import './Profile.css'

function ProfileInfo(props) {
	const isLoading = props.loading;

	if (isLoading) {
		return <div>Fetching profile data...</div>
	}

	var arr = [], languages = [];
	
	props.data.social.map((element, index) => arr.push(<a key={index} className="list-group-item list-group-item-action" href={element.link}>{element.label}</a>));
	props.data.languages.map((language, index) => languages.push(<li className="list-group-item" key={index}>{language}</li>));

	return (
		<div className="container">
			<div className="text-center big">Profile Info</div>
			<div className="mt-5">City: {props.data.city}</div>
			<div className="mt-4">Languages: <ul className="list-group">{languages}</ul></div>
			<div className="mt-4">Social: <div className="list-group">{arr}</div></div>
		</div>
	);
}

class Profile extends Component {
	componentDidMount() {
		if (localStorage.getItem('isAuthorized') === null) {
			this.props.history.push('/login');
		} else {
			this.props.profileHandler(localStorage.getItem('id'));
		}
	}
	render() {
		return (
			<div>
				<ProfileInfo data={this.props.profile} />
			</div>
		);
	}
}

export default connect(
	state => ({
		profile: state.profile
	}), 
	dispatch => ({
		profileHandler: (id) => {
			dispatch(asyncFetchProfileInformation(id));
		}
	})
)(Profile);