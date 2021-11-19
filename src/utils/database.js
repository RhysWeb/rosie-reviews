import Swal from 'sweetalert2';
const axios = require('axios');

class database {
	static async login(password) {
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
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review`,
			}).then((res) => {
				response = res.data;
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	static async getEventReviews(eventId) {
		let response;
		try {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/review/${eventId}`,
			}).then((res) => {
				response = res.data;
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	static async addEvent(form) {
		let resp;
		let eventId = `${form.eventName.replaceAll(' ', '_')}${form.eventDate}`;
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
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/event`,
			}).then((res) => {
				response = res.data;
			});
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

export default database;
