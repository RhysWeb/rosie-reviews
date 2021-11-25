import { useEffect, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { MainContainerLarger } from '../components/MainContainerLarger';
import database from '../utils/database.js';
import { useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { MyLink } from '../components/MyLink';
import { ArrowBack } from '@material-ui/icons';
import { SEO } from '../components/SEO';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	form: {
		fontSize: '1.2rem',
		width: '500px',

		'@media (max-width: 500px)': {
			width: '2vw',
		},
	},
});

const schema = yup.object().shape({
	color: yup.number().required('Enter a valid number'),
});

export const SettingsPage = () => {
	const classes = useStyles();
	const [submitting, setSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		handleChange,
		formState: { errors },
	} = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });

	const onSubmit = async (form) => {
		let r = document.querySelector(':root');
		r.style.setProperty('--primary', form.color);
		let resp = await database.changeColor(form.color);
		console.log(resp);
	};

	if (!window.navigator.onLine) {
		return (
			<MainContainerLarger>
				<SEO title="Settings" description="The settings page" />
				<Header />

				<div style={{ marginBottom: '30px' }} />

				<Typography
					style={{
						color: 'hsl(var(--primary-dark))',
						marginBottom: '10px',
						fontFamily: 'Changa One',
						fontSize: '1.2rem',
					}}
					align="center"
				>
					No Internet
				</Typography>
				<MyLink
					text="Back"
					icon={<ArrowBack style={{ fontSize: '60px' }} />}
					route="/"
					back
				/>
			</MainContainerLarger>
		);
	}

	return (
		<MainContainerLarger>
			<SEO title="Settings" description="The settings page" />
			<Header title="Settings" />
			<div id="colorWheel">
				<div id="innerWheel"></div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
				<div className={classes.form}></div>

				<fieldset>
					<legend
						style={{ color: 'hsl(var(--primary-dark))', fontWeight: 'bold' }}
					>
						Choose the colour of the site
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						{...register('color')}
						variant="filled"
						label="Enter number (1-360)"
						error={!!errors.eventName}
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
			<MyLink
				text="Back"
				icon={<ArrowBack style={{ fontSize: '60px' }} />}
				route="/"
			/>

			<hr />
		</MainContainerLarger>
	);
};
