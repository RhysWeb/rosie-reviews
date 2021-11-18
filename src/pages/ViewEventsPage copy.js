import { useEffect, useState } from 'react';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { EventCard } from '../components/EventCard';
import { Link } from 'react-router-dom';
import { MyLink } from '../components/MyLink';
import { ArrowBack, DeleteForever } from '@material-ui/icons';

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
		<MainContainerLarger>
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
			<MyLink
				text="Delete an event"
				icon={<DeleteForever style={{ fontSize: '60px' }} />}
				route="/"
			/>
			<MyLink
				text="Back to home"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/"
			/>
			<hr />
		</MainContainerLarger>
	);
};
