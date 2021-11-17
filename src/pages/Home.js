import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';
import { MyButton } from '../components/MyButton';
import { Visibility, AddCircle } from '@material-ui/icons';
import { useRef } from 'react';

// let icon = <AcUnit />;

export const Home = () => {
	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header link="/" />
			<MyButton
				text="Create New Event"
				icon={<AddCircle style={{ fontSize: '60px' }} />}
				route="/createEvent"
			/>
			<MyButton
				text="View Existing Events"
				icon={<Visibility style={{ fontSize: '60px' }} />}
				route="/viewEvents"
			/>
		</MainContainerLarger>
	);
};
