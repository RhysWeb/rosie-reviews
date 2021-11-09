import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

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
	name: { fontSize: '1.2rem', marginTop: '10px', fontWeight: 'bold' },
	date: { fontFamily: 'Verdana', color: 'blue' },

	button: { margin: '5px' },
});

export function EventCard({ eventCode, eventName, eventDate }) {
	const classes = useStyles();

	return (
		<Card elevation={4} className={classes.root}>
			<CardContent className={classes.details}>
				<div className={classes.codeContainer}>
					<Typography className={classes.code}>
						{`Code: ${eventCode}`} -{' '}
					</Typography>

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
			<Button color="primary" variant="contained" className={classes.button}>
				{' '}
				Select
			</Button>
		</Card>
	);
}

EventCard.propTypes = {
	eventCode: PropTypes.string,
	eventName: PropTypes.string,
	eventDate: PropTypes.string,
};
