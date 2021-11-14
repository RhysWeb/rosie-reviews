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

const useStyles = makeStyles({
	table: {
		minWidth: 550,
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
});

//This is a function to allow an asyncronous forEach ()
const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const LocalStoragePage = () => {
	const [reviews, setReviews] = useState([]);
	const classes = useStyles();
	const { currentEvent } = useData();
	const history = useHistory();

	useEffect(() => {
		console.log(window.navigator.onLine);
		const reviewsOnDb = localDatabase.getAllReviews(currentEvent.eventId);
		console.log(reviewsOnDb);
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

		console.log('click');
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
			<Header />
			<EventCard
				eventId={currentEvent.eventId}
				eventName={currentEvent.eventName}
				eventDate={currentEvent.eventDate}
				buttonName="Back"
			/>
			<div style={{ marginTop: '40px' }}></div>
			<TableContainer
				component={Paper}
				style={{ backgroundColor: 'hsl(1, 0%, 95%)' }}
			>
				<Table className={classes.table} aria-label="simple table">
					{tableHeader}
					<TableBody>{reviews && tableRowCreate(reviews)}</TableBody>
				</Table>
			</TableContainer>
			<Button
				color="primary"
				variant="contained"
				className={classes.button}
				onClick={buttonClick}
				disabled={!window.navigator.onLine}
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
		</MainContainerLarger>
	);
};
