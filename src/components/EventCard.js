import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useData } from '../utils/DataContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	card: {
		width: 500,
		display: 'flex',
		justifyContent: 'space-between',
		padding: '10px',
		marginBottom: '20px',
	},

	codeContainer: {
		display: 'flex',
	},
	code: {
		fontFamily: 'Verdana',
		color: 'blue',
		marginRight: '10px',
	},
	name: { marginTop: '10px', fontWeight: 'bold' },
	date: { fontFamily: 'Verdana', color: 'blue' },

	button: {
		margin: '5px',
		minWidth: '5.5rem',
		'&:hover': {
			boxShadow: '0px 0 5px #0d33fd, 0px 0 15px #cce6ff',
			transition: '0.1s ease-in-out all',
		},
	},
});

const rearrangeDate = (date) => {
	let year = date.slice(0, 4);
	let month = date.slice(5, 7);
	let day = date.slice(8, 10);
	return `${day}/${month}/${year}`;
};

export const EventCard = ({ eventId, eventName, eventDate, buttonName }) => {
	const history = useHistory();
	const { setCurrentEvent } = useData();
	const classes = useStyles();

	const buttonClick = () => {
		if (buttonName === 'Review') {
			history.push(`./reviewPage`);
			return;
		}
		if (buttonName === 'Back') {
			history.push(`./event`);
			return;
		}
		setCurrentEvent({
			eventId: eventId,
			eventName: eventName,
			eventDate: eventDate,
		});
		history.push(`./event`);
	};

	return (
		<Card elevation={4} className={classes.card}>
			<CardContent className={classes.details}>
				<div className={classes.codeContainer}>
					<Typography className={classes.code}>Date of Event: </Typography>

					<Typography className={classes.date}>
						{rearrangeDate(eventDate)}
					</Typography>
				</div>
				<Typography className={classes.name}>{eventName}</Typography>
			</CardContent>
			<Button
				color="primary"
				variant="contained"
				className={classes.button}
				onClick={buttonClick}
			>
				{buttonName}
			</Button>
		</Card>
	);
};

EventCard.propTypes = {
	eventId: PropTypes.string,
	eventName: PropTypes.string,
	eventDate: PropTypes.string,
	buttonName: PropTypes.string,
};
