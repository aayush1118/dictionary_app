//comp to render popup

import React, { useState } from 'react';
import NewWord from './NewWord';

const NewPopup = (props) => {
	const [word, setWord] = useState('');
	const [loadNewWord, setLoadNewWord] = useState(false);
	const submit = () => {
		setLoadNewWord(true);
		setTimeout(() => {
			props.handleClose();
		}, 1000);
	};
	return (
		<div className='popup-box'>
			<div className='newForm box'>
				<p>Add to Dictionary</p>

				<form>
					<label htmlFor='newWord'>New Word</label>
					<input
						type='text'
						name='newWord'
						autoFocus
						value={word}
						onChange={(e) => setWord(e.target.value)}
					/>
					<span className='form-btn' onClick={props.handleClose}>
						CANCEL
					</span>
					{word ? (
						<span className='form-btn' onClick={submit}>
							ADD
						</span>
					) : (
						''
					)}
					{loadNewWord ? <NewWord word={word}></NewWord> : ''}
				</form>
			</div>
		</div>
	);
};

export default NewPopup;
