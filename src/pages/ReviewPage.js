import React, { useState } from 'react';
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
import localDatabase from '../utils/localDatabase.js';
import logo1 from './logo1.jpg';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import { HeaderEventSecure } from '../components/HeaderEventSecure';
import { useData } from '../utils/DataContext';

///Code for the test selection///
const dropdownAnswers = [
	{
		value: 'Yes, lots of times',
		label: 'Yes, lots of times',
	},
	{
		value: 'Yes, on accasions',
		label: 'Yes, on accasions',
	},
	{
		value: 'No, never',
		label: 'No, never',
	},
];
////

export const ReviewPage = () => {
	const { currentEvent } = useData();

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
	const { register, handleSubmit, reset, handleChange } = useForm({
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

		localDatabase.addReview(form, currentEvent.eventCode);
		Swal.fire({
			icon: 'success',
			title: 'Review submitted',
			timer: 3000,
			text: 'Thank you for your feedback. Enjoy the rest of your day!',
			showConfirmButton: false,
			showCancelButton: false,
		}).then(() => {
			reset();
			Swal.fire({
				text: 'Please click the button to begin the next review.',
				confirmButtonText: 'Begin Next Review',
			}).then((info) => {
				console.log('.then function already started');
				reset();
				setKey(key + 1);
				window.scrollTo(0, 0);
			});
		});
	};

	return (
		<div className="grid">
			<HeaderEventSecure />
			<div className="leftSide"></div>
			<div className="rightSide"></div>
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange} key={key}>
				<div style={{ marginBottom: '40px' }}></div>

				<div className="logos2">
					<img src={logo1} id="logo1" alt="Radipole Park and Gardens Logo" />
					<img src={logo2} id="logo2" alt="Lottery Funding Logo" />
					<img src={logo3} id="logo3" alt="Weymouth Town Council Logo" />
				</div>
				<fieldset>
					<legend id="Q1" style={{ color: 'hsl(239, 83%, 21%)' }}>
						Q1. Have you visited Radipole park before?
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						{...register('visitedBefore')}
						variant="filled"
						label="Yes, No, 'Many times' etc"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Q2. How did you enjoy todays event?
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

				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Q3. Please provide a comment{' '}
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
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						Q4. Would you like to be informed about future events?
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
					<Button type="submit" variant="contained" color="primary" fullWidth>
						Submit your Review
					</Button>
				</div>
			</form>
		</div>
	);
};
