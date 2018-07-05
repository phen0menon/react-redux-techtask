import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncValidateAuth } from '../../actions/validate.js'

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
			<div className="container col-4 mt-4">
				<h2 className="text-center mt-3 mb-3">Log In to System</h2>
				{this.state.error !== null && <div>Invalid email or password</div>}
				<form onSubmit={this.onFormSubmitHandlerFn}>
					<input 
						type="email" 
						className="form-control mt-2" 
						name="email"
						required 
						placeholder="email"
						onChange={this.onEmailChangeHandlerFn} 
						/>
					<input 
						type="password" 
						className="form-control mt-2" 
						name="password" 
						required
						placeholder="Password"
						onChange={this.onPasswordChangeHandlerFn} 
						/>
					<input 
						disabled={this.props.authentication.loading}
						type="submit" 
						className="btn btn-primary form-control mt-2" 
						name="login" 
						value={this.props.authentication.loading ? 'Authentication...' : 'Sign In'} />
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