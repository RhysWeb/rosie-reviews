import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import logo from '../images/neutral.png';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		fontFamily: 'Changa One',
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	appTitle: {
		flexGrow: 1,
		fontFamily: 'Changa One',
		fontSize: '1.3rem',
	},
	button: {
		fontSize: '0.8rem',
		textTransform: 'uppercase',
		fontWeight: 'normal',
		marginRight: theme.spacing(2),
		border: 'solid 1px white',
		'&:hover': {
			background: 'hsl(60 50% 50% / 0.4)',
		},
	},
	heading: {
		fontSize: '1rem',
		textTransform: 'uppercase',
		fontWeight: 'normal',
		'@media (max-width: 400px)': {
			display: 'none',
		},
	},
}));

export const Header = ({ secure, back, title, home }) => {
	const history = useHistory();
	const classes = useStyles();

	const onClick = async (link) => {
		if (!secure) {
			history.push(link);
		} else {
			const { value: password } = await Swal.fire({
				input: 'password',
				showCancelButton: true,
				inputLabel: 'Password required',
				inputPlaceholder: 'Enter your password',
				inputAttributes: {
					maxlength: 10,
					autocapitalize: 'off',
					autocorrect: 'off',
				},
			});

			if (password === '123') {
				history.push(link);
			}
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar variant="dense">
					<Icon
						edge="start"
						className={classes.icon}
						color="inherit"
						aria-label="none"
					>
						<img src={logo} height={20} width={20} alt="logo" />
					</Icon>

					<Typography variant="h6" className={classes.appTitle}>
						Event Reviews
					</Typography>

					{back && (
						<Button
							className={classes.button}
							onClick={() => {
								onClick(back);
							}}
							color="inherit"
						>
							Back
						</Button>
					)}

					{home && (
						<Button
							className={classes.button}
							disabled={!window.navigator.onLine}
							onClick={() => {
								if (window.navigator.onLine) {
									onClick(home);
								}
							}}
							color="inherit"
						>
							Home
						</Button>
					)}

					<h1 className={classes.heading} color="inherit">
						{title}
					</h1>
				</Toolbar>
			</AppBar>
			<Typography
				style={{ marginTop: '45px' }}
				component="h2"
				variant="h5"
			></Typography>
		</div>
	);
};
