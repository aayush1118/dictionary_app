//comp to render worddeatils

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getWord } from '../redux/actions';

export const WordDetail = (props) => {
	useEffect(() => {
		props.getWord(props.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return props.wordLoaded ? (
		<>
			<div className='showCard'>
				<h1 className='word'>{props.data.word}</h1>
				<h4 className='category'>{props.data.category}</h4>
				<p className='definition'>{props.data.definitions}</p>
				<ul className='example'>
					{props.data.example.map((x) => (
						<li key={x._id}>{x.text}</li>
					))}
				</ul>
			</div>
		</>
	) : (
		<div className='showCard'></div>
	);
};

const mapStateToProps = (state) => {
	return { ...state };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getWord: () => dispatch(getWord(ownProps.id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WordDetail);
