import {interval, Observable, of} from 'rxjs';
import {takeUntil, mergeMap, catchError, map} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';
import {request} from 'universal-rxjs-ajax'; // because standard AjaxObservable only works in browser

import {IReduxState} from '../../types/redux-state';
import * as actions from '../actions';
import {actionTypes} from '../action-types';

interface IEpicState {
	value: IReduxState
}

interface IEpicAction {
	payload: {
		isServer: boolean;
	}
}

export const fetchUserEpic = (action$: Observable<actionTypes>) =>
	action$.pipe(
		ofType(actionTypes.START_FETCHING_CHARACTERS),
		mergeMap(() => {
			return interval(3000).pipe(
				map(() => actions.fetchCharacter()),
				takeUntil(
					action$.pipe(
						ofType(
							actionTypes.STOP_FETCHING_CHARACTERS,
							actionTypes.FETCH_CHARACTER_FAILURE
						)
					)
				)
			);
		})
	);

export const fetchCharacterEpic = (action$: Observable<IEpicAction>, state$: IEpicState) =>
	action$.pipe(
		ofType(actionTypes.FETCH_CHARACTER),
		mergeMap((action: IEpicAction) =>
			request({
				url: `https://swapi.co/api/people/${state$.value.nextCharacterId}`
			}).pipe(
				map(response =>
					actions.fetchCharacterSuccess(
						response.response,
						action.payload.isServer
					)
				),
				catchError(error =>
					of(
						actions.fetchCharacterFailure(
							error.xhr.response,
							action.payload.isServer
						)
					)
				)
			)
		)
	);

export const rootEpic = combineEpics(fetchUserEpic, fetchCharacterEpic);
