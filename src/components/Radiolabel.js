export const RadioLabel = (props) => {
	const handleRadioClick = (e) => {
		const result = e.target.value;
		console.log(result);
	};
	return (
		<label>
			<input
				{...props.register('reviewScore')}
				type="radio"
				name="reviewScore"
				onClick={handleRadioClick}
				value={props.value}
			/>
			<p>{props.value}</p>
		</label>
	);
};
