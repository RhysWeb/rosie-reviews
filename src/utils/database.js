import Swal from 'sweetalert2';
const axios = require('axios');

class database {
	static async getResults() {
		console.log('database function called');
	}

	static async login(password) {
		console.log('checking password and getting token');
		console.log(process.env.REACT_APP_DATABASE_SERVER);
		let resp;
		try {
			resp = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review/login`,
				data: {
					password: password,
				},
			});
		} catch {
			resp = 'Error retrieving token from the server';
			Swal.fire({
				icon: 'error',
				title: 'Password is incorrect',
			});
		}
		return resp;
	}

	static async addReview(form, eventId) {
		console.log(form);
		console.log('running axios');
		console.log(process.env.REACT_APP_DATABASE_SERVER);
		let resp;
		try {
			resp = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review`,
				data: {
					reviewComment: form.reviewComment,
					email: form.email,
					reviewScore: form.reviewScore,
					visitedBefore: form.visitedBefore,
					eventId: eventId,
					dateTime: form.dateTime,
				},
			});
		} catch {
			resp = 'Error with the server';
		}
		return resp;
	}

	static async getAllReviews() {
		let response;
		try {
			console.log('getting reviews');
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review`,
			}).then((res) => {
				console.log(res.data);
				response = res.data;
			});
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	static async getEventReviews(eventId) {
		let response;
		try {
			console.log('getting reviews for specific event');
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review/${eventId}`,
			}).then((res) => {
				response = res.data;
			});
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	static async addEvent(form) {
		console.log(form);
		console.log('running axios');
		console.log(process.env.REACT_APP_DATABASE_SERVER);
		let resp;
		let eventId = `${form.eventName.replaceAll(' ', '_')}${form.eventDate}`;
		console.log(eventId);
		try {
			resp = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/event`,
				data: {
					eventId: eventId,
					eventName: form.eventName,
					eventDate: form.eventDate,
				},
			});
		} catch {
			resp = 'Error with the server';
		}
		if (resp.status === 202) {
			Swal.fire({
				icon: 'error',
				title: 'Event already exists',
			});
			return;
		}
		return resp;
	}

	static async getAllEvents() {
		let response;
		try {
			console.log('getting events');
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/event`,
			}).then((res) => {
				console.log(res.data);
				response = res.data;
			});
			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

export default database;
