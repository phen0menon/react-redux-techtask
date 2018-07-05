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
				<div key={index} className="card text-white bg-success mb-3">
					<div className="card-header">
				    <h5 className="card-title">{article.title}</h5>
				    </div>
				  <div className="card-body">
				    <p className="card-text">{article.text}</p>
				  </div>
				</div>
			)
		)
		return (
			<div>
				{ this.props.data.loading === true && <div className="mt-4 text-center loading">Получаю данные...</div>}
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