import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useData } from '../utils/DataContext';
import { useHistory } from 'react-router-dom';
import { DeleteForever } from '@material-ui/icons';
import database from '../utils/database.js';

const useStyles = makeStyles({
	button: {
		width: 'clamp(360px,100%,600px)',
		minHeight: '70px',
		display: 'flex',
		justifyContent: 'flex-start',
		textDecoration: 'none',
		verticalAlign: 'bottom',
		lineHeight: '1rem',
		textTransform: 'none',
		borderRadius: '1em',
		padding: '20px',
		background: 'hsl(0 0% 90%)',
		color: 'hsl(var(--primary-dark))',
		border: 'solid hsl(var(--primary-main)) 2px',
		boxShadow: '5px 5px 5px rgb(0 0 0 / 0.5)',
		'&:hover': {
			color: 'hsl(var(--secondary-main))',
		},
		'&:active': {
			boxShadow: '6px 6px 6px rgb(0 0 0 / 0.2)',
			outline: 'solid grey 2px',
			color: 'black',
		},
	},
	date: {
		fontFamily: 'Changa One',
		width: '8rem',
	},

	name: {
		fontFamily: 'Roboto Slab, serif',
		fontSize: '1.0rem',
		textAlign: 'left',
	},
	delete: {
		color: 'red',
		marginLeft: 'auto',
	},
});

const rearrangeDate = (date) => {
	let year = date.slice(0, 4);
	let month = date.slice(5, 7);
	let day = date.slice(8, 10);
	return `${day}/${month}/${year}`;
};

export const EventCard = ({
	eventId,
	eventName,
	eventDate,
	getEvents,
	...props
}) => {
	const history = useHistory();
	const { setCurrentEvent, deleteEvent, setDeleteEvent } = useData();
	const classes = useStyles();
	let displayOnDelete = 'none';
	let additionalCardDeleteStyles = {};
	if (deleteEvent) {
		displayOnDelete = 'inline-block';
		additionalCardDeleteStyles = {
			background: 'hsl(0 50% 90%)',
			color: 'red',
			border: 'solid hsl(0 40% 30%) 2px',
		};
	}

	const buttonClick = async () => {
		if (!deleteEvent) {
			setCurrentEvent({
				eventId: eventId,
				eventName: eventName,
				eventDate: eventDate,
			});
			history.push(`./event`);
		} else {
			console.log('deleting');
			await database.deleteEvent(eventId);
			// setUpdateCount(updateCount++);
			setDeleteEvent(false);
			getEvents();
		}
	};

	return (
		<>
			<Button
				{...props}
				style={{ ...additionalCardDeleteStyles }}
				className={classes.button}
				onClick={buttonClick}
			>
				<span className={classes.date}>{rearrangeDate(eventDate)}</span>
				<span className={classes.name}>{eventName}</span>
				<DeleteForever
					style={{ display: displayOnDelete }}
					className={classes.delete}
				/>
			</Button>
			<div style={{ marginBottom: '20px' }}></div>
		</>
	);
};

EventCard.propTypes = {
	eventId: PropTypes.string,
	eventName: PropTypes.string,
	eventDate: PropTypes.string,
};
