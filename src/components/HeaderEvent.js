import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import logo from './newLogo.png';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export const HeaderEvent = () => {
	const history = useHistory();
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar variant="dense">
					<Icon
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<img src={logo} height={25} width={25} alt="logo" />
					</Icon>
					<Typography variant="h6" className={classes.title}>
						Event Reviews
					</Typography>

					<Button
						onClick={() => {
							history.push(`./event`);

							// let movePassword = prompt('Leave?');
							// // history.push(`http://localhost:3000`);
							// if (movePassword == '123') {
							// 	history.push(`./`);
							// } else {
							// 	return;
							// }
							// window.location.assign(process.env.REACT_APP_HOME_URL);
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
