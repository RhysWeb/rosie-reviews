import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AddCircle, Visibility, Album } from '@material-ui/icons';

const useStyles = makeStyles({
	link: {
		fontFamily: 'Changa One',
		textDecoration: 'none',
		fontSize: '1.5rem',
		padding: '0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		transition: 'color 0.5s',
		padding: '20px',
		margin: '20px',
		borderRadius: '1em',
		width: '15rem',
		'&:hover': {
			color: 'orange',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:focus': {
			color: 'orange',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:active': {
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
			color: 'black',
		},
	},
	icon: { fontSize: '80px', marginBottom: '10px' },
});

export const MyButton = (props) => {
	const classes = useStyles();

	let icon;
	let route;
	switch (props.icon) {
		case 'add':
			icon = <AddCircle className={classes.icon} />;
			route = '/createEvent';
			break;
		case 'eye':
			icon = <Visibility className={classes.icon} />;
			route = '/viewEvents';
			break;
		default:
			icon = <Album className={classes.icon} />;
	}

	return (
		<Link style={{ textDecoration: 'none' }} to={route}>
			<div className={classes.link}>
				{icon}
				{props.text}
			</div>
		</Link>
	);
};
