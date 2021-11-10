import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useData } from '../utils/DataContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
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

	button: { margin: '5px', minWidth: '5.5rem' },
});

export const EventCard = ({ eventCode, eventName, eventDate, buttonName }) => {
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
			eventCode: eventCode,
			eventName: eventName,
			eventDate: eventDate,
		});
		history.push(`./event`);
	};

	return (
		<Card elevation={4} className={classes.root}>
			<CardContent className={classes.details}>
				<div className={classes.codeContainer}>
					<Typography className={classes.code}>{`${eventCode} - `}</Typography>

					<Typography className={classes.date}>{eventDate}</Typography>
				</div>
				<Typography className={classes.name}>{eventName}</Typography>
				{/* <br />
				<Typography className={classes.pos} style={{ color: 'green' }}>
					{props.subheader2}
				</Typography>
				<Typography variant="body2" component="p">
					{props.text2}
				</Typography>
				<br />
				<Typography className={classes.pos} style={{ color: 'green' }}>
					{props.subheader3}
				</Typography>
				<Typography variant="body2" component="p">
					{props.text3}
				</Typography>
				<br /> */}
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
	eventCode: PropTypes.string,
	eventName: PropTypes.string,
	eventDate: PropTypes.string,
	buttonName: PropTypes.string,
};
