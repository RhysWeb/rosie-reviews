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

export const TestPage = () => {
	const [reviews, setReviews] = useState([]);
	const classes = useStyles();
	const { getValues, register, handleSubmit, reset, handleChange } = useForm({
		defaultValues: {
			test: '',
		},
	});

	// let var1;
	// let var2;
	// let var3;

	// useEffect(() => {
	// 	var1 = localStorage.getItem('value1');
	// 	var2 = localStorage.getItem('value2');
	// 	var3 = localStorage.getItem('value3');
	// }, []);

	const onSubmit = (form) => {
		console.log(form.test);
		localStorage.setItem('data', JSON.stringify(form));
	};

	return (
		<MainContainerLarger>
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Q1. Enter a value and see if it persists
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						{...register('test')}
						variant="filled"
						label="Enter it here"
					/>
					<TextField
						fullWidth
						{...register('test2')}
						variant="filled"
						label="Enter it here"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>

				<Button type="submit" variant="contained" color="primary" fullWidth>
					Submit
				</Button>
			</form>

			<pre>{JSON.parse(localStorage.getItem('data'))?.test}</pre>
			<pre>{JSON.parse(localStorage.getItem('data'))?.test2}</pre>
		</MainContainerLarger>
	);
};
