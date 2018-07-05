import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
	constructor(props) {
		super(props);
		this.logoutButtonHandler = this.logoutButtonHandler.bind(this);
		this.loginButtonHandler = this.loginButtonHandler.bind(this);
	}
	logoutButtonHandler() {
		localStorage.clear();
		this.props.history.push('/login');
	}
	loginButtonHandler() {
		this.props.history.push('/login')
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg container mt-2">
			  <div className="collapse navbar-collapse" id="navbarNavDropdown">
			    <ul className="navbar-nav mr-auto">
						<li className="nav-item"><Link to="/" className="nav-link"><i className="fa fa-home"></i> Главная</Link></li>
            <li className="nav-item"><Link to="/news" className="nav-link"><i className="fa fa-list"></i> Новости</Link></li>
            <li className="nav-item"><Link to="/profile" className="nav-link"><i className="fa fa-user-circle"></i> Профиль</Link></li>
			    </ul>

		    	<div className="form-inline my-2 my-lg-0">
    				{localStorage.getItem('isAuthorized') !== null && <button className="btn btn-primary" onClick={this.logoutButtonHandler}><i className="fa fa-sign-out"></i> Выйти</button>}
    				{localStorage.getItem('isAuthorized') === null && <button className="btn btn-primary" onClick={this.loginButtonHandler}><i className="fa fa-sign-in"></i> Войти</button>}
    			</div>
			  </div>
			</nav>
		);
	}
}

export default withRouter(Header);