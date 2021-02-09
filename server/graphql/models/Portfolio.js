class Portfolio {
	constructor(model, user) {
		this.Model = model;
		this.user = user;
	}

	getAll() {
		return this.Model.find();
	}

	getById(id) {
		return this.Model.findById(id);
	}

	create(data) {
		if (!this.user) {
			throw new Error('Not Authorized!');
		}

		data.user = this.user;
		return this.Model.create(data);
	}

	findAndUpdate(id, data) {
		return this.Model.findByIdAndUpdate(id, data, {
			new: true,
		});
	}

	findAndDelete(id) {
		return this.Model.findByIdAndRemove(id);
	}
}

module.exports = Portfolio;
