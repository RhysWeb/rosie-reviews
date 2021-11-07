import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export const Home = () => {
	return (
		<div style={{ margin: '100px' }}>
			<Header />
			<hr />

			<Link to="/createEvent">Create new event</Link>
			<hr />
			<Link to="/viewEvents">View existing events</Link>
			<hr />
		</div>
	);
};

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
