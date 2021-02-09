class User {
	constructor(model) {
		this.Model = model;
	}

	getAuthUser(ctx) {
		if (ctx.isAuthenticated()) {
			return ctx.getUser();
		}

		return null;
	}

	async signUp(signUpData) {
		if (signUpData.password !== signUpData.passwordConfirmation) {
			throw new Error('Password must be the same as password confirmation!');
		}

		// try {
		return await this.Model.create(signUpData);
		// } catch (error) {
		// throw new Error('User with provided email already exists!');
		// }
	}

	async signIn(signInData, ctx) {
		try {
			const user = await ctx.authenticate(signInData);
			return user;
		} catch (error) {
			return error;
		}
	}

	signOut(ctx) {
		try {
			ctx.logout();

			return true;
		} catch (error) {
			return false;
		}
	}
}

module.exports = User;
