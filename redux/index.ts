// @ts-ignore
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';

import {IReduxState} from '../types/redux-state';

import reducer from './reducers';
import {rootEpic} from './epics';

export default function initStore(initialState: IReduxState) {
	const epicMiddleware = createEpicMiddleware();
	const logger = createLogger({collapsed: true}); // log every action to see what's happening behind the scenes.
	const reduxMiddleware = applyMiddleware(epicMiddleware, logger);

	const store = createStore(reducer, initialState, reduxMiddleware);
	epicMiddleware.run(rootEpic);

	return store;
}
