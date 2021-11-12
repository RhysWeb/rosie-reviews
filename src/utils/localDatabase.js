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

	static clearLocalReviews(eventCode) {
		localStorage.removeItem(eventCode);
	}

	static getAllReviews(eventCode) {
		return JSON.parse(localStorage.getItem(eventCode));
	}
}

export default localDatabase;
