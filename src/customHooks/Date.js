const useDate = () => {
	const date = new Date();
	const [month, day, year] = [
		date.getMonth(),
		date.getDate(),
		date.getFullYear(),
	];
	const [hour, minutes, seconds] = [
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
	];

	let dateTime = `${day}/${month + 1}/${year} ${hour}:${minutes}:${seconds}`;

	return [dateTime];
};

export { useDate };
