import React from 'react';
import {Provider} from 'react-redux';
import App, {AppContext} from 'next/app';
import withRedux from 'next-redux-wrapper';
// @ts-ignore
import {Store} from 'redux';

import makeStore from '../redux';

interface IProps {
	store: Store
}

class MyApp extends App<IProps> {
	static async getInitialProps({Component, ctx}: AppContext) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		return {pageProps};
	}

	render() {
		const {Component, pageProps, store} = this.props;
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withRedux(makeStore)(MyApp);
