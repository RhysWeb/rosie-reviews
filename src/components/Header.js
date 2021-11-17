import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import logo from './neutral.png';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		fontFamily: 'Changa One',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontFamily: 'Changa One',
		fontSize: '1.3rem',
	},
	button: {
		fontFamily: 'Changa One',
	},
}));

export const Header = ({ secure, link }) => {
	const history = useHistory();
	const classes = useStyles();

	const onClick = async () => {
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
						className={classes.menuButton}
						color="inherit"
						aria-label="none"
					>
						<img src={logo} height={20} width={20} alt="logo" />
					</Icon>
					<Typography variant="h6" className={classes.title}>
						Event Reviews
					</Typography>

					<Button
						className={classes.button}
						onClick={() => {
							onClick();
						}}
						color="inherit"
					>
						Home
					</Button>
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
