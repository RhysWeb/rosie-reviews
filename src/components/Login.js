import { Link } from 'react-router-dom';
import { useData } from '../utils/DataContext';
import { useForm } from 'react-hook-form';
import {
	TextField,
	Button,
	CircularProgress,
	Typography,
} from '@material-ui/core';
import { useState } from 'react';
import database from '../utils/database.js';

export const Login = () => {
	const { token, setToken } = useData();
	const [submitting, setSubmitting] = useState(false);
	const { register, handleSubmit } = useForm({
		defaultValues: {
			password: '',
		},
	});

	const onSubmit = async (form) => {
		let token;
		try {
			setSubmitting(true);
			let resp = await database.login(form.password);
			token = resp.data.token;
			setToken(token);
			setSubmitting(false);
		} catch {
			console.log('error');
			setSubmitting(false);
		}
	};

	if (!(token === process.env.REACT_APP_TOKEN)) {
		return (
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div style={{ margin: '100px auto', maxWidth: '300px' }}>
						{submitting ? (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									marginBottom: '30px',
								}}
							>
								<CircularProgress
									size={70}
									thickness={6}
									style={{ textAlign: 'center', margin: '0 auto' }}
								/>
							</div>
						) : (
							<>
								<Typography
									style={{
										color: 'hsl(var(--primary-dark))',
										marginBottom: '10px',
										fontFamily: 'Changa One',
										fontSize: '1.2rem',
									}}
									align="center"
								>
									Welcome
								</Typography>
								<TextField
									type="password"
									fullWidth
									label="Enter password"
									{...register('password')}
									variant="filled"
									autoComplete="on"
								/>
								<Button
									disabled={submitting}
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
								>
									Login
								</Button>
							</>
						)}
					</div>
				</form>
			</div>
		);
	}
	return (
		<div style={{ margin: '100px' }}>
			<hr />
			<Link to="/reviewPage">Go to event review page</Link>
			<hr />
			<Link to="/test">test page</Link>
			<hr />
			<Link to="/resultsPage">View results</Link>
			<hr />
		</div>
	);
};
