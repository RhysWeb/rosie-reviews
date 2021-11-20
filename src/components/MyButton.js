import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	flexbox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '12rem',
	},

	button: {
		color: 'hsl(var(--primary-dark))',
		fontFamily: 'Changa One',
		textDecoration: 'none',
		fontSize: '1.2rem',
		transition: 'color 0.5s',
		textTransform: 'none',
		padding: '20px',
		borderRadius: '1em',
		overflow: 'hidden',
		'&:hover': {
			color: 'red',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:focus': {
			color: 'red',
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		},
		'&:active': {
			boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
			color: 'red',
		},
	},
});

export const MyButton = (props) => {
	const classes = useStyles();

	return (
		<Button className={classes.button} {...props}>
			<span className={classes.flexbox}>
				{props.icon}
				{props.text}
			</span>
		</Button>
	);
};
