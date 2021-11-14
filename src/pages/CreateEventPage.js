import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
	eventName: yup.string().required('This field is required'),
	eventDate: yup.string().required('This field is required'),
});

export const CreateEventPage = () => {
	const history = useHistory();

	const [submitting, setSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		handleChange,
		formState: { errors },
	} = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

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
						{...register('eventName')}
						variant="filled"
						label="Brief description of event"
						error={!!errors.eventName}
					/>
					<TextField
						fullWidth
						{...register('eventDate')}
						variant="filled"
						label="Date of Event"
						type="date"
						placeholder=""
						error={!!errors.eventDate}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					disabled={submitting || !window.navigator.onLine}
				>
					{!window.navigator.onLine
						? 'Offline - get a signal and refresh page'
						: 'Submit'}
				</Button>
			</form>
			<Link style={{ marginTop: '20px' }} to="/">
				Back
			</Link>
			<hr />
		</MainContainerLarger>
	);
};
