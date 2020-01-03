import {IReduxState} from '../../types/redux-state';

import {actionTypes} from '../action-types';

interface IActions {
	type: string;
	payload: any;
}

const INITIAL_STATE: IReduxState = {
	nextCharacterId: 1,
	character: {},
	isFetchedOnServer: false,
	error: null
};

export default function reducer(state = INITIAL_STATE, {type, payload}: IActions) {
	switch (type) {
		case actionTypes.FETCH_CHARACTER_SUCCESS:
			return {
				...state,
				character: payload.response,
				isFetchedOnServer: payload.isServer,
				nextCharacterId: state.nextCharacterId + 1
			};
		case actionTypes.FETCH_CHARACTER_FAILURE:
			return {
				...state,
				error: payload.error,
				isFetchedOnServer: payload.isServer
			};
		default:
			return state;
	}
}
