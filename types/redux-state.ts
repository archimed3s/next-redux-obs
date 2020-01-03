import {ICharApi} from './char';

export interface IReduxState {
	nextCharacterId: number;
	character: Partial<ICharApi>;
	isFetchedOnServer: boolean;
	error: string | null;
}
