import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncFetchNews } from '../../actions/fetchNews';
import './News.css';

class News extends Component {
	componentDidMount() {
		this.props.requestNews();
	}
	render() {
		var repos = [];
		this.props.data.news.map((article, index) => 
			repos.push(
				<div className="container article" key={index}>
					<div className="headline">{article.title}</div>
					<div className="text">{article.text}</div>
				</div>
			)
		)
		return (
			<div>
				{ this.props.data.loading === true && <div>Fetching News...</div>}
				{ this.props.data.loading === false && <div>{repos}</div>}
			</div>
		);
	}
}

export default connect(
	state => ({
		data: state.news
	}),
	dispatch => ({
		requestNews: () => {
			dispatch(asyncFetchNews());
		}
	})
)(News)