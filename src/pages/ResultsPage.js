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
import { ArrowBack, GetAppRounded } from '@material-ui/icons';
import { SEO } from '../components/SEO';
import { useHistory } from 'react-router-dom';
import { useCreateSS } from '../customHooks/UseCreateSS';
import { MyButton } from '../components/MyButton';
import { ObjectSchema } from 'yup';

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
		lineHeight: '1rem',
	},
	id: {
		color: 'red',
		fontSize: '0.7rem',
	},
	score: {
		fontSize: '0.7rem',
	},
	email: {
		color: 'black',
		fontSize: '0.7rem',
	},
	comment: {
		color: 'blue',
		fontSize: '0.7rem',
	},
	noReviews: {
		fontFamily: 'Roboto Slab, serif',
		fontSize: '1.5rem',
		textAlign: 'center',
		color: 'hsl(var(--primary-dark))',
		lineHeight: '1.4rem',
	},
	aveScoreBox: {
		background: 'hsl(0 0% 95%)',
		padding: '5px 20px',
		marginTop: '20px',
		marginBottom: '10px',
		border: 'solid hsl(var(--primary-main)) 2px',
		borderRadius: '1rem',
		// boxShadow: '5px 5px 5px rgb(0 0 0 / 0.5)',
		color: 'hsl(var(--primary-dark))',
		fontWeight: 'bold',
	},
	score: { color: 'red', fontWeight: 'bold' },
});

export const ResultsPage = () => {
	const { currentEvent } = useData();
	const [reviews, setReviews] = useState();
	const classes = useStyles();
	const history = useHistory();
	const [createSS] = useCreateSS();

	useEffect(() => {
		if (currentEvent.eventId === 'EmptyId') {
			history.push('./');
		}
	}, []);

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
	function createArrayOfArrays(arroyOfObjects) {
		let arrayofArrays = [];
		arrayofArrays.push(Object.keys(arroyOfObjects[0]));
		arroyOfObjects.map((object) => {
			arrayofArrays.push(Object.values(object));
		});
		return arrayofArrays;
	} //Thers no point to this function

	let example = [
		{
			_id: '619174fb85d8ad95d8aa9a55',
			reviewComment: '1',
			email: 'No email',
			reviewScore: '5',
			eventId: 'Christmas_funday2021-12-22',
			visitedBefore: 'Yes, lots of times',
			dateTime: '14/11/2021 20:43:14',
			__v: 0,
		},
		{
			_id: '619174fb85d8ad95d8aa9a55',
			reviewComment: '2',
			email: 'Rhys@email',
			reviewScore: '4',
			eventId: 'Christmas_funday2021-12-22',
			visitedBefore: 'Yes, lots of times',
			dateTime: '14/11/2021 20:43:14',
			__v: 0,
		},
	];

	function getAverageScore(reviews) {
		let reviewsArray = [];
		reviews?.forEach((review) => {
			reviewsArray.push(parseInt(review.reviewScore));
		});
		let averageScore;
		averageScore =
			reviewsArray.reduce((accum, curr) => accum + curr, 0) /
			reviewsArray.length;
		return Math.round((averageScore + Number.EPSILON) * 100) / 100;
	}
	// function convertObjToArray (obj) {
	// 	let array = []
	// 	let

	// 	return array
	// }

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
				title="Cloud Reviews"
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
			<div className={classes.aveScoreBox}>
				<span>Average Review Score: </span>
				<span className={classes.score}>
					{reviews && getAverageScore(reviews)}
				</span>
			</div>

			<div style={{ display: 'flex', marginBottom: '30px' }}>
				<MyButton
					icon={<GetAppRounded style={{ fontSize: '50px' }} />}
					text="Spreadsheet"
					onClick={() => {
						createSS(createArrayOfArrays(reviews), currentEvent.eventId);
						// createSS(['s', 's']);
					}}
					disabled={!window.navigator.onLine}
				/>
				{/* <button
					onClick={() => {
						console.log(Date(2021, 11, 24));
					}}
				>
					Try me
				</button> */}
				<MyLink
					text="Back"
					icon={<ArrowBack style={{ fontSize: '60px' }} />}
					route="/event"
				/>
				{/* 
				<pre style={{ marginLeft: '230px' }}>
					{JSON.stringify(reviews, null, ' ')}
				</pre> */}
			</div>
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
					{window.navigator.onLine ? (
						<CircularProgress size={70} thickness={6} />
					) : (
						<>
							<p className={classes.noReviews}>
								You are disconnected from the internet.
							</p>
							<p className={classes.noReviews}>
								Connect to see saved event reviews
							</p>
						</>
					)}

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
		</MainContainerLarger>
	);
};
