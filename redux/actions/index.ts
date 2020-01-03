import {actionTypes} from '../action-types';
import {ICharApi} from '../../types/char';

export const startFetchingCharacters = () => ({
	type: actionTypes.START_FETCHING_CHARACTERS
});
export const stopFetchingCharacters = () => ({
	type: actionTypes.STOP_FETCHING_CHARACTERS
});
export const fetchCharacter = (isServer = false) => ({
	type: actionTypes.FETCH_CHARACTER,
	payload: {isServer}
});
export const fetchCharacterSuccess = (response: ICharApi, isServer: boolean) => ({
	type: actionTypes.FETCH_CHARACTER_SUCCESS,
	payload: {response, isServer}
});
export const fetchCharacterFailure = (error: string, isServer: boolean) => ({
	type: actionTypes.FETCH_CHARACTER_FAILURE,
	payload: {error, isServer}
});
