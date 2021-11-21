import React, { useState, useEffect } from 'react';
import './ReviewPage.css';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { RadioLabel2 } from '../components/Radiolabel2';
import happy from '../images/happy.png';
import lesshappy from '../images/lesshappy.png';
import neutral from '../images/neutral.png';
import lesssad from '../images/lesssad.png';
import sad from '../images/sad.png';
import Swal from 'sweetalert2';
import localDatabase from '../utils/localDatabase.js';
import logo1 from '../images/logo1.jpg';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import { Header } from '../components/Header';
import { useData } from '../utils/DataContext';
import { useDate } from '../customHooks/Date';
import { SEO } from '../components/SEO';
import { useHistory } from 'react-router-dom';

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
	const [dateTime] = useDate();
	const [key, setKey] = useState(1);
	const [visitedBefore, setVisitedBefore] = useState('');
	const history = useHistory();
	const handleChange = (event) => {
		setVisitedBefore(event.target.value);
	};
	/*
	This key state is important and unusual.
	I found that when I submitted a form the form reset to default values using reset()
	but the floating label didnt reset back to normal.
	I learned that the components needed to be rerendered and the only way to force this 
	was to set the key of the component in the state and change it each time I submit the form
	This rerenders the whole form. I could have just rerendered bits of it but I decided to do the whole thing.
	Useful to know that if you want to force a component rerender you should change the key of the component
	*/
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			reviewComment: '',
			email: '',
			reviewScore: 'none',
		},
	});

	useEffect(() => {
		if (currentEvent.eventId === 'EmptyId') {
			history.push('./');
		}
	}, []);

	const onSubmit = (form) => {
		if (form.reviewScore === 'none') {
			Swal.fire({
				icon: 'error',
				title: 'No review submitted',
				text: 'Please click on one of the faces and try submitting again',
			});
			return;
		}

		const reviewSubmission = {
			reviewComment: form.reviewComment,
			email: form.email,
			reviewScore: form.reviewScore,
			visitedBefore: visitedBefore,
			dateTime: dateTime,
		};

		localDatabase.addReview(reviewSubmission, currentEvent.eventId);
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
				setVisitedBefore('');
				reset();
				setKey(key + 1);
				window.scrollTo(0, 0);
			});
		});
	};

	return (
		<div className="grid">
			<SEO title="Review Event" description="Review the event" />
			<Header secure fullScreen link="/event" title="Create Review" />
			<div className="leftSide"></div>
			<div className="rightSide"></div>
			<form id="form" onSubmit={handleSubmit(onSubmit)} key={key}>
				<div style={{ marginBottom: '40px' }}></div>

				<div className="logos2">
					<img src={logo1} id="logo1" alt="Radipole Park and Gardens Logo" />
					<img src={logo2} id="logo2" alt="Lottery Funding Logo" />
					<img src={logo3} id="logo3" alt="Weymouth Town Council Logo" />
				</div>
				<fieldset>
					<legend>Q1. Have you visited Radipole Park Before?</legend>
					<div style={{ marginBottom: '20px' }}></div>
					<TextField
						id="visitedBefore"
						select
						label="Please select an option"
						value={visitedBefore}
						onChange={handleChange}
						variant="filled"
						// margin="normal"
						fullWidth
					>
						{dropdownAnswers.map((option) => (
							<MenuItem
								{...register('visitedBefore')}
								key={option.value}
								value={option.value}
							>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>

				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend>Q2. How did you enjoy todays event?</legend>
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
					<legend>Q3. Please provide a comment </legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						multiline
						fullWidth
						rows={3}
						label="What did you like? What could we improve? Write here"
						{...register('reviewComment')}
						variant="filled"
						onFocus={() => {
							console.log('focus');
							document.getElementById(`bottom`).scrollIntoView({
								block: 'end',
								behavior: 'smooth',
							});
						}}
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '40px' }}></div>

				<fieldset>
					<legend>
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
					<Button
						id="submitButton"
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Submit your Review
					</Button>
				</div>

				<div id="bottom"></div>
			</form>
		</div>
	);
};
