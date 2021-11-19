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
	CircularProgress,
} from '@material-ui/core';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { Header } from '../components/Header';
import { EventCard } from '../components/EventCard';
import { useData } from '../utils/DataContext';
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
	noReviews: {
		fontFamily: 'Roboto Slab, serif',
		fontSize: '2rem',
		textAlign: 'center',
		color: 'hsl(var(--primary-dark))',
	},
});

export const ResultsPage = () => {
	const { currentEvent } = useData();
	const [reviews, setReviews] = useState();
	const classes = useStyles();

	useEffect(() => {
		async function getReviews() {
			const reviewsOnDb = await database.getEventReviews(currentEvent.eventId);
			setReviews(reviewsOnDb);
		}
		getReviews();
	}, [currentEvent.eventId]);

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
			const {
				_id,
				dateTime,
				email,
				reviewScore,
				reviewComment,
				visitedBefore,
			} = review;

			return (
				<TableRow key={_id}>
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
			<SEO
				title="Reviews on cloud"
				description="Reviews on the cloud for the particular event"
			/>
			<Header title="Database Reviews" />
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
					<div style={{ marginBottom: '30px' }} />
					<CircularProgress size={70} thickness={6} />
					<div style={{ marginBottom: '48px' }} />
				</>
			)}
			{reviews?.length === 0 && (
				<>
					<div style={{ marginBottom: '20px' }} />
					<p className={classes.noReviews}>
						This event has no reviews yet saved to the cloud
					</p>
					<div style={{ marginBottom: '20px' }} />
				</>
			)}

			<MyLink
				text="Back"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/event"
			/>
		</MainContainerLarger>
	);
};
