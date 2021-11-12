import { useEffect, useState } from 'react';
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

export const LocalStoragePage = () => {
	const [reviews, setReviews] = useState([]);
	const classes = useStyles();
	const { currentEvent } = useData();

	useEffect(() => {
		console.log(window.navigator.onLine);
		const reviewsOnDb = localDatabase.getAllReviews(currentEvent.eventCode);
		console.log(reviewsOnDb);
		setReviews(reviewsOnDb);
	}, [currentEvent.eventCode]);

	useEffect(() => {}, [window.navigator.onLine]);

	const uploadReviews = (array) => {
		array.map((obj) => {
			return database.addReview(obj, currentEvent.eventCode);
		});
	};

	const buttonClick = () => {
		if (!reviews) {
			return;
		}
		uploadReviews(reviews);
		localDatabase.clearLocalReviews(currentEvent.eventCode);
		setReviews(localDatabase.getAllReviews(currentEvent.eventCode));
	};

	const tableHeader = (
		<TableHead>
			<TableRow>
				<TableCell className={classes.headerRow} align="left">
					Review ID
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
			const { email, reviewScore, reviewComment, visitedBefore } = review;

			return (
				<TableRow key={index}>
					<TableCell className={classes.id} align="left">
						{index + 1}
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
				eventCode={currentEvent.eventCode}
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
					? 'Offline - get a signal and refresh the page'
					: 'Upload Local Reviews to the Server'}
			</Button>
		</MainContainerLarger>
	);
};
