import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';
import { MyLink } from '../components/MyLink';
import { Visibility, AddCircle, Settings } from '@material-ui/icons';

// let icon = <AcUnit />;

export const Home = () => {
	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header title="Home page" />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '30px',
				}}
			>
				<MyLink
					text="Create Event"
					icon={<AddCircle style={{ fontSize: '60px' }} />}
					route="/createEvent"
				/>
				<MyLink
					text="View Events"
					icon={<Visibility style={{ fontSize: '60px' }} />}
					route="/viewEvents"
				/>
			</div>
			<MyLink
				text="Settings"
				icon={<Settings style={{ fontSize: '60px' }} />}
				route="/viewEvents"
			/>
		</MainContainerLarger>
	);
};
