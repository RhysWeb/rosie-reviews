import Swal from 'sweetalert2';
const axios = require('axios');

class localDatabase {
	static async addReview(form, eventCode) {
		let storedData = JSON.parse(localStorage.getItem(eventCode));
		if (storedData) {
			storedData.push(form);
			localStorage.setItem(eventCode, JSON.stringify(storedData));
		} else {
			localStorage.setItem(eventCode, JSON.stringify([form]));
		}
	}

	static getAllReviews(eventCode) {
		return JSON.parse(localStorage.getItem(eventCode));
	}
}

export default localDatabase;
