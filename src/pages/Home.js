import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { MainContainerLarger } from '../components/MainContainerLarger';
import { SEO } from '../components/SEO';
import { makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
		'&:hover': {
			color: 'orange',
		},
	},
	icon: { color: 'red' },
});

export const Home = () => {
	const classes = useStyles();

	return (
		<MainContainerLarger>
			<SEO title="Home page" description="The home page for the review site" />
			<Header />

			<hr />

			<Link style={{ textDecoration: 'none' }} to="/createEvent">
				<div className={classes.link}>
					<AddCircleIcon style={{ fontSize: '80px', marginBottom: '10px' }} />
					Create New Event
				</div>
			</Link>
			<div style={{ marginTop: '50px' }} />
			<Link style={{ textDecoration: 'none' }} to="/viewEvents">
				<div className={classes.link}>
					<VisibilityIcon style={{ fontSize: '80px', marginBottom: '5px' }} />
					View Existing Events
				</div>
			</Link>
			<hr />
		</MainContainerLarger>
	);
};
