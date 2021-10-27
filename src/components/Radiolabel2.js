export const RadioLabel2 = (props) => {
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
			<img src={props.image} id={`face${props.value}`} />
		</label>
	);
};
