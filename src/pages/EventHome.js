import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export const EventHome = () => {
	return (
		<div style={{ margin: '100px' }}>
			<Header />
			<hr />
			<Link to="/reviewPage">Go to event review page</Link>
			<hr />
			<Link to="/resultsPage">View results</Link>
			<hr />
			<Link to="/localStoragePage">View local storage</Link>
			<hr />
		</div>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
