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
import MySwitch from '../components/MySwitch';
import { useData } from '../utils/DataContext';
import { Typography } from '@material-ui/core';

export const ViewEventsPage = () => {
	const [events, setEvents] = useState();
	const { deleteEvent, setDeleteEvent, updateCount } = useData();

	async function getEvents() {
		const eventsOnDb = await database.getAllEvents();
		setEvents(eventsOnDb);
	}

	let labelColor = deleteEvent ? 'red' : 'hsl(var(--primary-dark))';
	useEffect(() => {
		setDeleteEvent(false);
		getEvents();
	}, []);

	if (!window.navigator.onLine) {
		return (
			<MainContainerLarger>
				<SEO
					title="View Events"
					description="The list of available events for review"
				/>
				<Header />

				<div style={{ marginBottom: '30px' }} />
				<Typography
					style={{
						color: 'hsl(var(--primary-dark))',
						marginBottom: '10px',
						fontFamily: 'Changa One',
						fontSize: '1.2rem',
					}}
					align="center"
				>
					No Internet
				</Typography>
				<MyLink
					text="Back"
					back
					icon={<ArrowBack style={{ fontSize: '60px' }} />}
					route="/"
				/>
			</MainContainerLarger>
		);
	}
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
						getEvents={() => getEvents()}
					/>
				);
			})}
			<div style={{ display: 'flex', transform: 'translateX(15px)' }}>
				<p
					style={{
						marginRight: '10px',
						color: labelColor,
						fontFamily: 'Changa One',
						textDecoration: 'none',
						fontSize: '1.2rem',
					}}
				>
					Delete Event
				</p>
				<MySwitch />
			</div>
			<MyLink
				text="Back to Home"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/"
			/>

			<hr />
		</MainContainerLarger>
	);
};
