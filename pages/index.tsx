import React from 'react';
import Link from 'next/link';
import {of, Subject} from 'rxjs';
import {StateObservable} from 'redux-observable';
import {connect} from 'react-redux';

import Info from '../components/Info';
import {rootEpic} from '../redux/epics';
import * as actions from '../redux/actions';
// @ts-ignore
import {Store} from 'redux';

interface IProps {
	startFetchingCharacters: () => void;
	stopFetchingCharacters: () => void;
}

interface IInitialProps {
	store: Store,
	isServer: boolean;
}

class HomePage extends React.Component<IProps> {
	static async getInitialProps({store, isServer}: IInitialProps) {
		const state$ = new StateObservable(new Subject(), store.getState());
		const resultAction = await rootEpic(
			of(actions.fetchCharacter(isServer)),
			state$
		).toPromise(); // we need to convert Observable to Promise
		store.dispatch(resultAction);

		return {isServer};
	}

	componentDidMount() {
		this.props.startFetchingCharacters();
	}

	componentWillUnmount() {
		this.props.stopFetchingCharacters();
	}

	render() {
		return (
			<div>
				<h1>Home Page</h1>
				<Info/>
				<br/>
				<nav>
					<Link href="/another">
						<a>Navigate to "/another"</a>
					</Link>
				</nav>
			</div>
		);
	}
}

export default connect(null, {
	startFetchingCharacters: actions.startFetchingCharacters,
	stopFetchingCharacters: actions.stopFetchingCharacters
})(HomePage);
