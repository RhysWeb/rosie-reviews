import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	link: {
		fontFamily: 'Changa One',
		textDecoration: 'none',
		fontSize: '1.2rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		transition: 'color 0.5s',
		padding: '20px',
		borderRadius: '1em',
		width: '12rem',
		'&:hover': {
			color: 'orange',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},

		'&:active': {
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
			color: 'black',
		},
	},
});

export const MyButton = (props) => {
	const classes = useStyles();

	return (
		<Link className={classes.link} to={props.route}>
			{props.icon}
			{props.text}
		</Link>
	);
};
