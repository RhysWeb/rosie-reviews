import { useEffect, useState } from 'react';
import {
	Typography,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { useForm } from 'react-hook-form';
import { TextField, MenuItem } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Header } from '../components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SEO } from '../components/SEO';
import { EventCard } from '../components/EventCard';
import { Link } from 'react-router-dom';

export const ViewEventsPage = () => {
	const [events, setEvents] = useState([]);

	useEffect(async () => {
		const eventsOnDb = await database.getAllEvents();
		console.log(eventsOnDb);
		setEvents(eventsOnDb);
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
