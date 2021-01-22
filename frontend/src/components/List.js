//component to render list

import React, { useEffect, useState } from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWords } from '../redux/actions';
import NewPopup from './NewPopup';

const List = (props) => {
	if (props.loaded === false) {
		props.getWords();
	}

	const [searchBar, setSearchBar] = useState(false);
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	//toggeling popup
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	//toggeling searchbar
	const search = () => {
		setSearchBar(!searchBar);
		setQuery('');
		setResults([]);
	};

	//get search results
	const getResults = (e) => {
		setQuery(e.target.value);
		const result = props.data.filter(
			(element) => element.word.search(query) !== -1
		);
		setResults(result);
	};
	useEffect(() => {
		//get words from store
		props.getWords();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return props.loaded ? (
		searchBar ? (
			<>
				<header className='header'>
					<nav className='searchBar'>
						<input
							type='text'
							id='searchBox'
							placeholder='search'
							autoFocus
							name='query'
							value={query}
							onChange={getResults}
						/>
						<button
							className='close-btn search-btn'
							onClick={search}
						>
							✕
						</button>
					</nav>
					<p>
						{results.length !== 0
							? `${results.length} words found`
							: 'No matches'}
					</p>
				</header>
				<main className='main'>
					{results.map((item) => (
						<div className='listItem' key={item._id}>
							<Link to={`/${item._id}`}>
								<Item id={item._id}></Item>
							</Link>
						</div>
					))}
				</main>
			</>
		) : (
			<>
				<header className='header'>
					<nav className='nav'>
						<h1>Vocab</h1>
						<button className='search-btn' onClick={search}>
							search
						</button>
					</nav>
					<p>Words List</p>
				</header>
				<main className='main'>
					{props.data.map((item) => (
						<div className='listItem' key={item._id}>
							<Link to={`/${item._id}`}>
								<Item id={item._id}></Item>
							</Link>
						</div>
					))}
				</main>
				<button className='create-btn' onClick={togglePopup}>
					<div className='create'>+</div>
				</button>
				{isOpen && <NewPopup handleClose={togglePopup} />}
			</>
		)
	) : (
		<>
			<header className='header'>
				<nav className='nav'>
					<h1>Vocab</h1>
				</nav>
				<p>Words List</p>
			</header>
			<button className='create-btn' onClick={togglePopup}>
				<div className='create'>+</div>
			</button>
			{isOpen && <NewPopup handleClose={togglePopup} />}
		</>
	);
};
//redux functions for state and dispatch
const mapStateToProps = (state) => {
	return { ...state };
};

const mapDispatchToProps = (dispatch) => {
	return {
		getWords: () => dispatch(getWords()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
