import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';
import { MyLink } from '../components/MyLink';
import { Visibility, AddCircle } from '@material-ui/icons';
import { useRef } from 'react';
import { MyButton } from '../components/MyButton';

// let icon = <AcUnit />;

export const Home = () => {
	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header link="/" />
			<MyLink
				text="Create New Event"
				icon={<AddCircle style={{ fontSize: '60px' }} />}
				route="/createEvent"
			/>
			<MyLink
				text="View Existing Events"
				icon={<Visibility style={{ fontSize: '60px' }} />}
				route="/viewEvents"
			/>
			<MyButton
				text="View Existing Events"
				icon={<Visibility style={{ fontSize: '60px' }} />}
			/>
		</MainContainerLarger>
	);
};
