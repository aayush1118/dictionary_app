//comp to submit new word

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { newWord } from '../redux/actions';
import { Redirect } from 'react-router-dom';

export const NewWord = (props) => {
	useEffect(() => {
		props.newWord(props);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <Redirect to='/' reload={true} />;
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		newWord: () => dispatch(newWord(ownProps.word)),
	};
};

export default connect(null, mapDispatchToProps)(NewWord);
