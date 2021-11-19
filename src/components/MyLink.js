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
		outlineRadius: '1em',
		color: 'hsl(var(--primary-dark))',
		borderRadius: '1em',
		width: '12rem',
		overflow: 'hidden',
		'&:hover': {
			color: 'hsl(var(--secondary-main))',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:focus': {
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:active': {
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
			color: 'black',
		},
	},
});

export const MyLink = (props) => {
	const classes = useStyles();

	return (
		<Link className={classes.link} to={props.route}>
			{props.icon}
			{props.text}
		</Link>
	);
};
