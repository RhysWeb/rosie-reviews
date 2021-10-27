const axios = require('axios');

class database {
	static async getResults() {
		console.log('database function called');
	}

	static async addReview(form) {
		console.log(form);
		console.log('running axios');
		console.log(process.env.REACT_APP_DATABASE_SERVER);
		let resp = await axios({
			method: 'post',
			url: process.env.REACT_APP_DATABASE_SERVER,
			data: {
				reviewComment: form.reviewComment,
				email: form.email,
				reviewScore: form.reviewScore,
				eventId: 'devEvent',
			},
		});
		return resp;
	}
}

export default database;
