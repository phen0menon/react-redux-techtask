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
		this.props.history.push('/');
	}
	loginButtonHandler() {
		this.props.history.push('/login')
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <Link to="/" className="navbar-brand">React Personal Page</Link>
			  <div className="collapse navbar-collapse" id="navbarNavDropdown">
			    <ul className="navbar-nav mr-auto">
						<li className="nav-item"><Link to="/" className="nav-link">Index</Link></li>
            <li className="nav-item"><Link to="/news" className="nav-link">News</Link></li>
            <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
			    </ul>

		    	<div className="form-inline my-2 my-lg-0">
    				{localStorage.getItem('isAuthorized') !== null && <button className="btn btn-primary" onClick={this.logoutButtonHandler}>Logout</button>}
    				{localStorage.getItem('isAuthorized') === null && <button className="btn btn-primary" onClick={this.loginButtonHandler}>Sign In</button>}
    			</div>
    			}
			  </div>
			</nav>
		);
	}
}

export default withRouter(Header);