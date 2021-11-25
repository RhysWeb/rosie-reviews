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

	static async getColor() {
		let response;
		try {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/profile`,
			}).then((res) => {
				response = res.data[0].color;
			});
			return response;
		} catch (err) {
			console.log(err);
		}
		return response;
	}

	static async changeColor(color) {
		let resp;

		try {
			resp = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/profile`,
				data: {
					color: color,
				},
			});
		} catch (err) {
			console.log(err);
			resp = 'Error changing color';
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
		} catch (e) {
			console.log(e);
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

	static async deleteEvent(eventId) {
		let response;
		try {
			console.log('trying a delete');
			await axios({
				method: 'delete',
				url: `${process.env.REACT_APP_DATABASE_SERVER}/event/${eventId}`,
			}).then((res) => {
				response = res;
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
		} catch (e) {
			console.log(e);
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
