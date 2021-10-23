import './ReviewPage.css';
import { useForm } from 'react-hook-form';
import { RadioLabel } from '../components/Radiolabel';
import { TextField, Button } from '@material-ui/core';

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

				<div className="reviewLablesDiv">
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
				</div>
				<br />
				<TextField
					margin="normal"
					multiline
					fullWidth
					rows={2}
					label="Please enter an optional comment / review"
					{...register('reviewComment')}
					variant="filled"
				/>

				<TextField
					fullWidth
					variant="filled"
					{...register('email')}
					type="email"
					label="Email address (optional)"
				/>

				<div>
					<Button disabled={formState.isSubmitting} type="submit">
						Submit
					</Button>
				</div>

				<pre>{JSON.stringify(getValues(), null, 2)}</pre>
			</form>
		</div>
	);
};
