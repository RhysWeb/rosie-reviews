import { Link } from 'react-router-dom';

export const Home = () => {
	return (
		<>
			<hr />
			<Link to="/reviewPage">Go to an event review page</Link>
			<hr />
			<Link to="/check_all_tests">Create a new event review page</Link>
			<hr />
			<Link to="/addAuthor">Download the event review results</Link>
			<hr />
		</>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
