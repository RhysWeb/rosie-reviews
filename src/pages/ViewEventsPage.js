import { useEffect, useState } from 'react';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { Header } from '../components/Header';
import { SEO } from '../components/SEO';
import { EventCard } from '../components/EventCard';
import { MyLink } from '../components/MyLink';
import { ArrowBack, DeleteForever } from '@material-ui/icons';
import { MyButton } from '../components/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ViewEventsPage = () => {
	const [events, setEvents] = useState();

	useEffect(() => {
		async function getEvents() {
			const eventsOnDb = await database.getAllEvents();
			setEvents(eventsOnDb);
		}
		getEvents();
	}, []);
	if (!events) {
		return (
			<MainContainerLarger>
				<SEO
					title="View Events"
					description="The list of available events for review"
				/>
				<Header />
				<div style={{ marginBottom: '30px' }} />
				<CircularProgress size={70} thickness={6} />
			</MainContainerLarger>
		);
	}

	return (
		<MainContainerLarger>
			<SEO
				title="View Events"
				description="The list of available events for review"
			/>
			<Header title="events" />

			{events.map((event) => {
				return (
					<EventCard
						key={event.eventId}
						eventId={event.eventId}
						eventName={event.eventName}
						eventDate={event.eventDate}
					/>
				);
			})}
			<MyButton
				text="Delete an Event"
				icon={<DeleteForever style={{ fontSize: '60px' }} />}
				disabled={!window.navigator.onLine}
				onClick={() => {
					console.log('click');
				}}
			/>

			<MyLink
				text="Back to Home"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/"
			/>

			<hr />
		</MainContainerLarger>
	);
};
