//comp to render word page

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import WordDetail from './WordDetail';

const Word = () => {
	const match = useRouteMatch();
	const id = match.params.id;

	return (
		<>
			<Link to={'/'} className='closeBtn'>
				✕
			</Link>
			<WordDetail key={id} id={id}></WordDetail>
		</>
	);
};

export default Word;
