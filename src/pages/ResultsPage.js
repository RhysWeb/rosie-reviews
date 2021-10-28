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

const useStyles = makeStyles({
	table: {
		minWidth: 550,
	},
	headerRow: {
		color: 'black',
		fontWeight: 'bolder',
		fontSize: '14px',
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
});

export const ResultsPage = () => {
	const [reviews, setReviews] = useState([]);
	const classes = useStyles();

	useEffect(async () => {
		const reviewsOnDb = await database.getAllReviews();
		console.log(reviewsOnDb);
		setReviews(reviewsOnDb);
	}, []);

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
					Comment
				</TableCell>
			</TableRow>
		</TableHead>
	);

	function tableRowCreate(myArray) {
		return myArray.map((review, index) => {
			const { _id, email, reviewScore, reviewComment } = review;

			return (
				<TableRow key={_id}>
					<TableCell className={classes.id} align="left">
						{_id}
					</TableCell>
					<TableCell className={classes.score} align="left">
						{reviewScore}
					</TableCell>
					<TableCell className={classes.email} align="left">
						{email}
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
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					{tableHeader}
					<TableBody>{reviews && tableRowCreate(reviews)}</TableBody>
				</Table>
			</TableContainer>
		</MainContainerLarger>
	);
};
