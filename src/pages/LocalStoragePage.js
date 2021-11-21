import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
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
import localDatabase from '../utils/localDatabase.js';
import database from '../utils/database';
import { Header } from '../components/Header';
import { useData } from '../utils/DataContext';
import { EventCard } from '../components/EventCard';
import { MyLink } from '../components/MyLink';
import { ArrowBack } from '@material-ui/icons';
import { SEO } from '../components/SEO';

const useStyles = makeStyles({
	tableContainer: {
		minWidth: '1vw',
	},
	table: {
		minWidth: 700,
	},
	headerRow: {
		color: 'black',
		fontWeight: 'bolder',
		fontSize: '11px',
		fontFamily: 'Arial',
	},
	id: {
		color: 'red',
		fontSize: '10px',
	},
	email: {
		color: 'black',
		fontSize: '10px',
	},
	comment: {
		color: 'blue',
		fontSize: '10px',
	},
	button: {
		margin: '20px',
		padding: '20px',
		'&:hover': {
			boxShadow: '0px 0 5px #0d33fd, 0px 0 25px #cce6ff',
			transition: '0.1s ease-in-out all',
		},
	},
	noReviews: {
		fontFamily: 'Roboto Slab, serif',
		fontSize: '2rem',
		textAlign: 'center',
		color: 'hsl(var(--primary-dark))',
	},
});

//This is a function to allow an asyncronous forEach ()
const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const LocalStoragePage = () => {
	const [reviews, setReviews] = useState();
	const classes = useStyles();
	const { currentEvent } = useData();
	const history = useHistory();

	useEffect(() => {
		const reviewsOnDb = localDatabase.getAllReviews(currentEvent.eventId);
		setReviews(reviewsOnDb);
	}, [currentEvent.eventId]);

	const uploadReviews = (array) => {
		asyncForEach(array, async (obj) => {
			let resp = await database.addReview(obj, currentEvent.eventId);
			if (resp.status === 200) {
				localDatabase.clearLocalReview(obj, currentEvent.eventId);
				setReviews(localDatabase.getAllReviews(currentEvent.eventId));
			}
		});
	};

	const buttonClick = () => {
		if (!reviews || !window.navigator.onLine) {
			return;
		}

		uploadReviews(reviews);
		// localDatabase.clearLocalReviews(currentEvent.eventId);
		// setReviews(localDatabase.getAllReviews(currentEvent.eventId));
	};

	const refreshClick = () => {
		history.push('localStoragePage');
	};

	const tableHeader = (
		<TableHead>
			<TableRow>
				<TableCell className={classes.headerRow} align="left">
					Date & Time
				</TableCell>
				<TableCell className={classes.headerRow} align="left">
					Review{<br />}Score
				</TableCell>
				<TableCell className={classes.headerRow} align="left">
					Email
				</TableCell>
				<TableCell className={classes.headerRow} align="left">
					Visited{<br />}Before?
				</TableCell>

				<TableCell className={classes.headerRow} align="left">
					Comment
				</TableCell>
			</TableRow>
		</TableHead>
	);

	function tableRowCreate(myArray) {
		return myArray.map((review, index) => {
			const { dateTime, email, reviewScore, reviewComment, visitedBefore } =
				review;

			return (
				<TableRow key={index}>
					<TableCell className={classes.id} align="left">
						{dateTime}
					</TableCell>
					<TableCell className={classes.score} align="left">
						{reviewScore}
					</TableCell>
					<TableCell className={classes.email} align="left">
						{email}
					</TableCell>
					<TableCell className={classes.email} align="left">
						{visitedBefore}
					</TableCell>
					<TableCell className={classes.comment} align="left">
						{reviewComment}
					</TableCell>
				</TableRow>
			);
		});
	}

	return (
		<MainContainerLarger>
			<SEO title="Local Reviews (upload them)" description="Local reviews" />
			<Header title="Local Reviews" />
			<EventCard
				eventId={currentEvent.eventId}
				eventName={currentEvent.eventName}
				eventDate={currentEvent.eventDate}
				style={{ color: 'black' }}
				disabled={true}
			/>
			{reviews ? (
				<TableContainer
					className={classes.tableContainer}
					component={Paper}
					style={{ backgroundColor: 'hsl(1, 0%, 95%)' }}
				>
					<Table className={classes.table} aria-label="simple table">
						{reviews?.length !== 0 && tableHeader}
						<TableBody>{reviews && tableRowCreate(reviews)}</TableBody>
					</Table>
				</TableContainer>
			) : (
				<>
					<div style={{ marginBottom: '20px' }} />
					<p className={classes.noReviews}>
						This event has no local reviews saved
					</p>
					<div style={{ marginBottom: '20px' }} />
				</>
			)}
			{reviews?.length === 0 && (
				<>
					<div style={{ marginBottom: '20px' }} />
					<p className={classes.noReviews}>
						This event has no reviews yet saved to the local database
					</p>
					<div style={{ marginBottom: '20px' }} />
				</>
			)}
			<Button
				color="primary"
				variant="contained"
				className={classes.button}
				onClick={buttonClick}
				disabled={!window.navigator.onLine || reviews?.length === 0 || !reviews}
			>
				{!window.navigator.onLine
					? "Offline - get a signal, then click 'refresh' below"
					: 'Upload Local Reviews to the Server'}
			</Button>
			{!window.navigator.onLine && (
				<Button
					color="primary"
					variant="contained"
					className={classes.button}
					onClick={refreshClick}
				>
					Refresh
				</Button>
			)}
			<MyLink
				text="Back"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/event"
			/>
		</MainContainerLarger>
	);
};
