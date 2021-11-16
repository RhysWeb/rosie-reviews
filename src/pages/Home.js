import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';
import { MyButton } from '../components/MyButton';

export const Home = () => {
	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header secure link="/" />
			<MyButton text="Create New Event" icon="add" />
			<MyButton text="View Existing Events" icon="eye" />
		</MainContainerLarger>
	);
};
