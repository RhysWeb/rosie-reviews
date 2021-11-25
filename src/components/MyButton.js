import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	flexbox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-end',

		width: '12rem',
	},

	button: {
		fontFamily: 'Changa One',
		textDecoration: 'none',
		fontSize: '1.2rem',
		transition: 'color 0.5s',
		textTransform: 'none',
		padding: '0px',
		paddingTop: '10px',
		borderRadius: '1em',
		overflow: 'hidden',
		width: '12rem',
		height: '7.5rem',
		// '&:focus': {
		// 	color: 'red',
		// 	boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		// },
		// '&:active': {
		// 	boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
		// 	color: 'red',
		// },
		color: 'hsl(var(--primary-dark))',
		'&:hover': {
			color: 'hsl(var(--primary-dark))',
		},
		'@media (hover)': {
			'&:hover': {
				color: 'hsl(var(--secondary-main))',
				boxShadow: '15px 15px 15px rgb(0 0 0 / 0.5)',
				// outline: 'solid hsl(var(--primary-dark)) 0.1px',
			},
		},
		'@media (max-width: 550px)': {
			fontSize: '1rem',
			padding: '15px',
			width: '8rem',
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
