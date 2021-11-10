import { useEffect, useState } from 'react';
import {
	Typography,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@material-ui/core';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { useForm } from 'react-hook-form';
import { TextField, MenuItem } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Header } from '../components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	table: {
		minWidth: 550,
	},
	headerRow: {
		color: 'black',
		fontWeight: 'bolder',
		fontSize: '11px',
		fontFamily: 'Arial',
	},
	id: {
		color: 'red',
		fontSize: '10px',
	},
	email: {
		color: 'black',
		fontSize: '10px',
	},
	comment: {
		color: 'blue',
		fontSize: '10px',
	},
});

const schema = yup.object().shape({
	eventCode: yup.string().required('This field is required'),
	eventName: yup.string().required('This field is required'),
	eventDate: yup.string().required('This field is required'),
});

export const CreateEventPage = () => {
	const history = useHistory();

	const [submitting, setSubmitting] = useState(false);
	const {
		getValues,
		register,
		handleSubmit,
		reset,
		handleChange,
		formState: errors,
	} = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

	// let var1;
	// let var2;
	// let var3;

	// useEffect(() => {
	// 	console.log(localStorage.getItem('data'));
	// }, []);

	const onSubmit = async (form) => {
		console.log('click');
		console.log(form);
		setSubmitting(true);

		await database.addEvent(form);
		history.push(`./viewEvents`);

		setSubmitting(false);
	};

	return (
		<MainContainerLarger>
			<Header />
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Create an event
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						{...register('eventCode')}
						variant="filled"
						label="make up a unique code for the event (no spaces)"
						error={!!errors.eventCode}
					/>
					<TextField
						fullWidth
						{...register('eventName')}
						variant="filled"
						label="Brief description of event"
						error={!!errors.eventName}
					/>
					<TextField
						fullWidth
						{...register('eventDate')}
						variant="filled"
						label="Date of event"
						error={!!errors.eventDate}
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					disable={submitting}
				>
					Submit
				</Button>
			</form>
			<Link style={{ marginTop: '20px' }} to="/">
				Back
			</Link>
			<hr />
		</MainContainerLarger>
	);
};
