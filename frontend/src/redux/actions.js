import axios from 'axios';
//redux api actions

const fetchWordsSuccess = (words) => {
	return {
		type: 'GET_WORDS',
		payload: words,
	};
};

const fetchWordSuccess = (word) => {
	return {
		type: 'GET_WORD',
		payload: word,
	};
};

const createWordSuccess = () => {
	return {
		type: 'NEW_WORD',
	};
};

export const getWords = () => {
	return (dispatch) => {
		axios
			.get('api/')
			.then((res) => {
				const words = res.data;
				dispatch(fetchWordsSuccess(words));
			})
			.catch((err) => console.log(err));
	};
};

export const getWord = (id) => {
	return (dispatch) => {
		axios
			.get(`api/${id}`)
			.then((res) => {
				const word = res.data;
				dispatch(fetchWordSuccess(word));
			})
			.catch((err) => console.log(err));
	};
};

export const newWord = (input) => {
	return (dispatch) => {
		axios
			.post('api/create', { input })
			.then(() => {
				dispatch(createWordSuccess());
				getWords();
			})
			.catch((err) => console.log(err));
	};
};
