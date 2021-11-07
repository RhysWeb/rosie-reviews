import Swal from 'sweetalert2';
const axios = require('axios');

class localDatabase {
	static async addReview(form) {
		let storedData = JSON.parse(localStorage.getItem('data'));
		if (storedData) {
			storedData.push(form);
			localStorage.setItem('data', JSON.stringify(storedData));
		} else {
			localStorage.setItem('data', JSON.stringify([form]));
		}
	}

	static getAllReviews(event) {
		return JSON.parse(localStorage.getItem('data'));
	}
}

export default localDatabase;
