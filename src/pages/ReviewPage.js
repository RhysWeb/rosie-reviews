import React, { useEffect, useState } from 'react';
import './ReviewPage.css';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { RadioLabel2 } from '../components/Radiolabel2';
import happy from './happy.png';
import lesshappy from './lesshappy.png';
import neutral from './neutral.png';
import lesssad from './lesssad.png';
import sad from './sad.png';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import database from '../utils/database.js';

export const ReviewPage = () => {
	const [key, setKey] = useState(1);
	/*
	This key state is important and unusual.
	I found that when I submitted a form the form reset to default values using reset()
	but the floating label didnt reset back to normal.
	I learned that the components needed to be rerendered and the only way to force this 
	was to set the key of the component in the state and change it each time I submit the form
	This rerenders the whole form. I could have just rerendered bits of it but I decided to do the whole thing.
	Useful to know that if you want to force a component rerender you should change the key of the component
	*/
	const history = useHistory();
	const { getValues, register, handleSubmit, reset, handleChange, formState } =
		useForm({
			defaultValues: {
				reviewComment: '',
				email: '',
				reviewScore: 'none',
			},
		});

	const onSubmit = (form) => {
		console.log('click');
		console.log(form);
		if (form.reviewScore === 'none') {
			Swal.fire({
				icon: 'error',
				title: 'No review submitted',
				text: 'Please click on one of the faces and try submitting again',
			});
			return;
		}

		database.addReview(form).then(async (res) => {
			if (res.status === 200) {
				reset();
				setKey(key + 1);
				Swal.fire({
					icon: 'success',
					title: 'Review submitted',
					text: 'Thank you for your feedback. Enjoy the rest of your day!',
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'No review submitted',
					text: 'The system isnt working. Please tell someone at the event so that they can go back to using paper',
				});
			}

			console.log(res);
		});
	};

	return (
		<div className="grid">
			<div className="leftSide"></div>
			<div className="rightSide"></div>
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} key={key}>
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						How did you enjoy todays event?
					</legend>
					<div style={{ marginBottom: '20px' }}></div>
					<div className="reviewLablesDiv">
						<RadioLabel2 register={register} value={5} image={happy} />
						<RadioLabel2 register={register} value={4} image={lesshappy} />
						<RadioLabel2 register={register} value={3} image={neutral} />
						<RadioLabel2 register={register} value={2} image={lesssad} />
						<RadioLabel2 register={register} value={1} image={sad} />
					</div>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>

				<div style={{ marginBottom: '50px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Please provide a comment
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						multiline
						fullWidth
						rows={2}
						label="What did you like? What could we improve? Write here"
						{...register('reviewComment')}
						variant="filled"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '50px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Would you would like to be informed about future events?
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						variant="filled"
						{...register('email')}
						type="email"
						label="Please provide an email address (optional)"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '40px' }}></div>

				<div>
					<Button
						disabled={formState.isSubmitting}
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Submit your Review
					</Button>
				</div>
			</form>
		</div>
	);
};
