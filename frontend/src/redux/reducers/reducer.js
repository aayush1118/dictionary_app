//root reducer

export const rootReducer = (state = { loaded: false }, action) => {
	switch (action.type) {
		case 'GET_WORDS':
			return { data: action.payload, loaded: true };
		case 'GET_WORD':
			return { data: action.payload, wordLoaded: true };
		case 'NEW_WORD':
			return { loaded: false };
		default:
			return state;
	}
};
