const useDate = () => {
	const thedate = new Date();
	const [month, day, year] = [
		thedate.getMonth(),
		thedate.getDate(),
		thedate.getFullYear(),
	];
	const [hour, minutes, seconds] = [
		thedate.getHours(),
		thedate.getMinutes(),
		thedate.getSeconds(),
	];

	let dateTime = `${day}/${month + 1}/${year} ${hour}:${minutes}:${seconds}`;
	let date = `${day}/${month + 1}/${year}`;

	return [dateTime, date];
};

export { useDate };
