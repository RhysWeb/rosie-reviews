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
		borderRadius: '1em',
		width: '12rem',
		overflow: 'hidden',
		// These next few lines are required to sort a weird problem on ipad. Buttons and links were starting up with the hover effect applied. So the media query removes the hover effects on touchscreen devices as these have 'hover:none'. However, it then reverted to the browser default hover style, so I had to set the hover color style to be the same as the unhover style.;
		color: 'hsl(var(--primary-dark))',
		'&:hover': {
			color: 'hsl(var(--primary-dark))',
		},
		'@media (hover)': {
			'&:hover': {
				color: 'hsl(var(--secondary-main))',
				boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
			},
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
