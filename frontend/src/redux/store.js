import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/reducer';
import thunk from 'redux-thunk';
//init store

export default createStore(rootReducer, applyMiddleware(thunk));
