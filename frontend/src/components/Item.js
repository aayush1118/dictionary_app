//component for list item

import React from 'react';
import { connect } from 'react-redux';

const Item = (props) => {
	return (
		<>
			<h2 className='listWord'>{props.item.word}</h2>
			<span className='listCategory'>({props.item.category})</span>
			<p className='listDefinition'>{props.item.definitions}</p>
		</>
	);
};

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps;
	const item = state.data.filter((n) => n._id === id);

	return { item: item[0] };
};

export default connect(mapStateToProps)(Item);
