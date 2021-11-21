import { EventCard } from '../components/EventCard';
import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { useDate } from '../customHooks/Date';
import { useData } from '../utils/DataContext';
import { AddCircle, ArrowBack, CloudDone, CloudOff } from '@material-ui/icons';
import { MyLink } from '../components/MyLink';
import { SEO } from '../components/SEO';

export const EventHome = () => {
	const { currentEvent } = useData();
	const [, date] = useDate(currentEvent.eventDate);

	return (
		<MainContainerLarger>
			<SEO
				title={`Event Date: ${date}`}
				description="Home page for a unique event"
			/>
			<Header title={`Event on ${date}`} />

			<EventCard
				eventId={currentEvent.eventId}
				eventName={currentEvent.eventName}
				eventDate={currentEvent.eventDate}
				disabled={true}
			/>
			<hr />
			<MyLink
				text="Create Reviews"
				icon={<AddCircle style={{ fontSize: '60px' }} />}
				route="/reviewPage"
			/>
			<div style={{ display: 'flex' }}>
				<MyLink
					text="View Saved Reviews"
					icon={<CloudDone style={{ fontSize: '60px' }} />}
					route="/resultsPage"
				/>
				<MyLink
					text="View Local Reviews"
					icon={<CloudOff style={{ fontSize: '60px' }} />}
					route="/localStoragePage"
				/>
			</div>
			<MyLink
				text="back to Events"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/viewEvents"
			/>
		</MainContainerLarger>
	);
};
