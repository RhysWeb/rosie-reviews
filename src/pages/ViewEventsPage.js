import { useEffect, useState } from 'react';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { EventCard } from '../components/EventCard';
import { Link } from 'react-router-dom';

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
		<MainContainerLarger style={{ minWidth: '550px' }}>
			<SEO
				title="Events"
				description="The list of available events for review"
			/>
			<Header />
			{events.map((event) => {
				return (
					<EventCard
						key={event.eventCode}
						eventCode={event.eventCode}
						eventName={event.eventName}
						eventDate={event.eventDate}
						buttonName="select"
					/>
				);
			})}
			<Link to="/">Back</Link>
			<hr />
		</MainContainerLarger>
	);
};
