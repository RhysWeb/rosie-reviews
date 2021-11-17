import { useEffect, useState } from 'react';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { EventCard } from '../components/EventCard';
import { Link } from 'react-router-dom';
import { MyButton } from '../components/MyButton';
import { ArrowBack } from '@material-ui/icons';

export const ViewEventsPage = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		async function getEvents() {
			const eventsOnDb = await database.getAllEvents();
			setEvents(eventsOnDb);
		}
		getEvents();
	}, []);

	return (
		<MainContainerLarger style={{ minWidth: '430px' }}>
			<SEO
				title="Events"
				description="The list of available events for review"
			/>
			<Header />

			{events.map((event) => {
				return (
					<EventCard
						key={event.eventId}
						eventId={event.eventId}
						eventName={event.eventName}
						eventDate={event.eventDate}
						buttonName="select"
					/>
				);
			})}
			<MyButton
				text="Back to home"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/"
			/>
			<hr />
		</MainContainerLarger>
	);
};
