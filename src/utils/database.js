const axios = require('axios');

class database {
	static async getResults() {
		console.log('database function called');
	}

	static async addReview(form) {
		console.log(form);
		console.log('running axios');
		console.log(process.env.REACT_APP_DATABASE_SERVER);
		let resp;
		try {
			resp = await axios({
				method: 'post',
				url: process.env.REACT_APP_DATABASE_SERVER,
				data: {
					reviewComment: form.reviewComment,
					email: form.email,
					reviewScore: form.reviewScore,
					eventId: 'devEvent',
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
				url: process.env.REACT_APP_DATABASE_SERVER,
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
