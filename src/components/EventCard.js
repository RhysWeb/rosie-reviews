import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useData } from '../utils/DataContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	button: {
		width: 'clamp(360px,100%,600px)',
		background: 'hsl(0 0% 90%)',
		display: 'flex',
		justifyContent: 'flex-start',
		textDecoration: 'none',
		verticalAlign: 'bottom',
		lineHeight: '1rem',
		textTransform: 'none',
		borderRadius: '1em',
		padding: '20px',
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
});

const rearrangeDate = (date) => {
	let year = date.slice(0, 4);
	let month = date.slice(5, 7);
	let day = date.slice(8, 10);
	return `${day}/${month}/${year}`;
};

export const EventCard = ({ eventId, eventName, eventDate, ...props }) => {
	const history = useHistory();
	const { setCurrentEvent } = useData();
	const classes = useStyles();

	const buttonClick = () => {
		setCurrentEvent({
			eventId: eventId,
			eventName: eventName,
			eventDate: eventDate,
		});
		history.push(`./event`);
	};

	return (
		<>
			<Button {...props} className={classes.button} onClick={buttonClick}>
				<span className={classes.date}>{rearrangeDate(eventDate)}</span>
				<span className={classes.name}>{eventName}</span>
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
