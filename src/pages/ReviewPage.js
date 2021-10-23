import './ReviewPage.css';
import { useForm } from 'react-hook-form';
import { RadioLabel } from '../components/Radiolabel';
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
				<h3>Please select a review score</h3>

				{/* <div className="reviewLablesDiv">
					<RadioLabel register={register} value={1} />
					<RadioLabel register={register} value={2} />
					<RadioLabel register={register} value={3} />
					<RadioLabel register={register} value={4} />
					<RadioLabel register={register} value={5} />
					<RadioLabel register={register} value={6} />
					<RadioLabel register={register} value={7} />
					<RadioLabel register={register} value={8} />
					<RadioLabel register={register} value={9} />
					<RadioLabel register={register} value={10} />
				</div> */}

				<div className="reviewLablesDiv">
					<RadioLabel2 register={register} value={5} image={happy} />
					<RadioLabel2 register={register} value={4} image={lesshappy} />
					<RadioLabel2 register={register} value={3} image={neutral} />
					<RadioLabel2 register={register} value={2} image={lesssad} />
					<RadioLabel2 register={register} value={1} image={sad} />
				</div>
				<br />
				<TextField
					margin="normal"
					multiline
					fullWidth
					rows={2}
					label="Comment / review"
					{...register('reviewComment')}
					variant="filled"
				/>
				<div style={{ marginBottom: '30px' }}></div>
				<TextField
					fullWidth
					variant="filled"
					{...register('email')}
					type="email"
					label="Email address (optional)"
				/>
				<div style={{ marginBottom: '30px' }}></div>

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
