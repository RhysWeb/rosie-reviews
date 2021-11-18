import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	flexbox: { display: 'flex', flexDirection: 'column', alignItems: 'center' },

	button: {
		color: 'blue',
		fontFamily: 'Changa One',
		textDecoration: 'none',
		fontSize: '1.2rem',
		transition: 'color 0.5s',
		textTransform: 'none',
		padding: '20px',
		borderRadius: '1em',
		minWidth: '12rem',
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
		<Button className={classes.button} {...props}>
			<div className={classes.flexbox}>
				{props.icon}
				{props.text}
			</div>
		</Button>
	);
};