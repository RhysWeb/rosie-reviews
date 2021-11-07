import { Link } from 'react-router-dom';
import { useData } from '../utils/DataContext';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
		console.log(form.password);
		let token;
		try {
			let resp = await database.login(form.password);
			console.log(resp);
			token = resp.data.token;
			setToken(token);
		} catch {
			console.log('error');
		}
	};

	if (!(token == process.env.REACT_APP_TOKEN)) {
		return (
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div style={{ margin: '100px auto', maxWidth: '300px' }}>
						<TextField
							type="password"
							fullWidth
							label="Enter password"
							{...register('password')}
							variant="filled"
						/>
						<div>
							<Button
								disabled={submitting}
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
							>
								Login
							</Button>
						</div>
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

/*<FileInput name="files" control={control} />*/ //after typogrphy
/**/
