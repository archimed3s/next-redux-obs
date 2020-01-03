import React, {FC} from 'react';
import Link from 'next/link';

const AnotherPage: FC = () => (
	<div>
		<h1>Another Page</h1>
		<Link href="/">
			<a>Get back to "/"</a>
		</Link>
	</div>
);

export default AnotherPage;
