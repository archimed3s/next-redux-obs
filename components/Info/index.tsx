import React, {FC} from 'react';
import {connect} from 'react-redux';

import {IReduxState} from '../../types/redux-state';
import {ICharApi} from '../../types/char';

interface IProps {
	character: Partial<ICharApi>;
	error: string | null;
	isFetchedOnServer: boolean;
}

const Info: FC<IProps> = ({character, error, isFetchedOnServer = false}) => {
	return (
		<div className="info">
			{error ? (
				<p>We encountered an error.</p>
			) : (
				<article>
					<h3>Character: {character.name}</h3>
					<p>birth year: {character.birth_year}</p>
					<p>gender: {character.gender}</p>
					<p>skin color: {character.skin_color}</p>
					<p>eye color: {character.eye_color}</p>
				</article>
			)}
			<p>
				(was character fetched on server? - <b>{isFetchedOnServer.toString()})</b>
			</p>
		</div>
	);
};

export default connect((state: IReduxState) => {
	return ({
		character: state.character,
		error: state.error,
		isFetchedOnServer: state.isFetchedOnServer
	});
})(Info);