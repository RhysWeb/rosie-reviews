class localDatabase {
	static async addReview(form, eventId) {
		let storedData = JSON.parse(localStorage.getItem(eventId));
		if (storedData) {
			storedData.push(form);
			localStorage.setItem(eventId, JSON.stringify(storedData));
		} else {
			localStorage.setItem(eventId, JSON.stringify([form]));
		}
	}

	static clearLocalReviews(eventId) {
		localStorage.removeItem(eventId);
	}

	static async clearLocalReview(review, eventId) {
		let storedData = JSON.parse(localStorage.getItem(eventId));
		if (storedData) {
			let newData = storedData.filter((obj) => {
				return review.dateTime !== obj.dateTime;
			});
			localStorage.setItem(eventId, JSON.stringify(newData));
		}
	}

	static getAllReviews(eventId) {
		return JSON.parse(localStorage.getItem(eventId));
	}
}

export default localDatabase;
