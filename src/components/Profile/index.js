import React, { Component } from 'react';
import { connect } from 'react-redux';
import {asyncFetchProfileInformation} from '../../actions/fetchInfo';
import './Profile.css'

function ProfileInfo(props) {
	const isLoading = props.loading;

	if (isLoading) {
		return <div>Получаю данные...</div>
	}

	var arr = [], languages = [];
	
	props.data.social.map((element, index) => arr.push(<a className="text-white" key={index} href={element.link}>{element.label}</a>));
	props.data.languages.map((language, index) => languages.push(<li key={index}>{language}</li>));

	return (
		<div className="container mt-4">

			<div className="card text-white bg-primary mb-3">
			  <div className="card-header"><i className="fa fa-user"></i> Личность</div>
			  <div className="card-body">
			    <h5 className="card-title">Личная информация</h5>
			    <p className="card-text"><span className="td-ul">Город проживания: </span><span className="d-block">{props.data.city}</span></p>
			    <p className="card-text"><span className="td-ul">Знания языков: </span><span className="list-group d-block">{languages}</span></p>
			    <p className="card-text"><span className="td-ul">Социальные сети: </span><span className="list-group">{arr}</span></p>
			  </div>
			</div>
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