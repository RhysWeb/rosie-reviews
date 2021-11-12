import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';

export const Home = () => {
	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header />

			<hr />

			<Link to="/createEvent">create new event</Link>
			<hr />
			<Link to="/viewEvents">view existing events</Link>
			<hr />
		</MainContainerLarger>
	);
};
