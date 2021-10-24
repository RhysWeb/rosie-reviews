import './ReviewPage.css';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { RadioLabel2 } from '../components/Radiolabel2';
import happy from './happy.png';
import lesshappy from './lesshappy.png';
import neutral from './neutral.png';
import lesssad from './lesssad.png';
import sad from './sad.png';

export const ReviewPage = () => {
	const { getValues, register, handleSubmit, handleChange, formState } =
		useForm({
			defaultValues: {
				reviewComment: '',
			},
		});

	const onSubmit = (form) => {
		console.log('click');
		console.log(form);
	};

	return (
		<div className="grid">
			<div className="leftSide"></div>
			<div className="rightSide"></div>
			<form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
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
						Please provide a comment (What did you like? What could we improve?)
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						multiline
						fullWidth
						rows={2}
						label="Comment / review"
						{...register('reviewComment')}
						variant="filled"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '50px' }}></div>

				<fieldset>
					<legend style={{ color: 'hsl(239, 83%, 21%)' }}>
						If you would like to be informed about future events please provide
						an email address
					</legend>
					<div style={{ marginBottom: '20px' }}></div>

					<TextField
						fullWidth
						variant="filled"
						{...register('email')}
						type="email"
						label="Email address (optional)"
					/>
					<div style={{ marginBottom: '10px' }}></div>
				</fieldset>
				<div style={{ marginBottom: '60px' }}></div>

				<div>
					<Button
						disabled={formState.isSubmitting}
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Submit
					</Button>
				</div>

				<pre>{JSON.stringify(getValues(), null, 2)}</pre>
			</form>
		</div>
	);
};
