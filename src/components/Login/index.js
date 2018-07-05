import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncValidateAuth } from '../../actions/validate.js'
import './index.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			error: null
		}
		this.onPasswordChangeHandlerFn = this.onPasswordChangeHandlerFn.bind(this);
		this.onEmailChangeHandlerFn = this.onEmailChangeHandlerFn.bind(this);
		this.onFormSubmitHandlerFn = this.onFormSubmitHandlerFn.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.authentication.type === 'AUTHENTICATION_SUCCESS') {
			this.props.history.push('/profile');
		} else if (nextProps.authentication.type === 'AUTHENTICATION_FAIL') {
			this.setState({ error: nextProps.authentication.error })
		}
	}
	componentWillMount() {
		if (localStorage.getItem('isAuthorized') !== null) {
			this.props.history.push('/profile');
		}
	}
	onEmailChangeHandlerFn(e) {
		this.setState({ 
			email: e.target.value,
			error: null
		})
	}
	onPasswordChangeHandlerFn(e) {
		this.setState({
			password: e.target.value,
			error: null
		})
	}
	onFormSubmitHandlerFn(e) {
		e.preventDefault();
		this.props.authenticationHandler(this.state.email, this.state.password)
		this.setState({ error: null })
	}
	render() {
		return (
			<div className="container col-6 mt-6 card card-block">
				<h2 className="text-center mt-4 mb-4">Авторизироваться</h2>
				{this.state.error !== null && <div className="text-center mt-2 mb-4 text-danger">Неправильная почта или пароль</div>}
				<form onSubmit={this.onFormSubmitHandlerFn}>
					<div className="form-group mt-2">
						<label className="has-float-label">
						<input 
							type="email" 
							className="form-control mt-2" 
							name="email"
							required 
							placeholder="example@qwe.com"
							onChange={this.onEmailChangeHandlerFn} 
							/>
							<span>Адрес эл. почты</span>
						</label>
					</div>
					<div className="form-group mt-4">
						<label className="has-float-label">
							<input 
								type="password" 
								className="form-control mt-2" 
								name="password" 
								required
								placeholder="12345678"
								onChange={this.onPasswordChangeHandlerFn} 
								/>
								<span>Ваш пароль</span>
							</label>
					</div>
					<input 
						disabled={this.props.authentication.loading}
						type="submit" 
						className="btn btn-primary form-control mt-2 mb-4" 
						name="login" 
						value={this.props.authentication.loading ? 'Авторизация...' : 'Войти'} />
				</form>
			</div>
		);
	}
}

export default connect(
	state => ({
		authentication: state.authentication
	}),
	dispatch => ({
		authenticationHandler: (email, password) => {
			dispatch(asyncValidateAuth(email, password))	
		}
	})
)(Login);