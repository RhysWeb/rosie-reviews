import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<>
			<hr />
			<Link to="/reviewPage">Go to the event review page</Link>
			<hr />

			<Link to="/resultsPage">View event review results</Link>
			<hr />
		</>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
