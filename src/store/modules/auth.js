import axios from "axios";
import transport from "../../helpers/transport";

export default {
	state: {
		currentUser: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
		isLoggedIn: !!localStorage.getItem("user"),
		auth_error: null
	}, 

	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},

		currentUser(state) {
			return state.currentUser;
		},

		authError(state) {
			return state.auth_error;
		}
	}, 

	mutations: {
		loginSuccess(state, payload) {
			state.currentUser = payload;
			state.auth_error = null;
			state.isLoggedIn = true;

			localStorage.setItem("user", JSON.stringify(state.currentUser));
		},

		signUpSuccess(state) {
			state.auth_error = null;
		},

		authFailed(state, payload) {
			state.auth_error = payload;
		},

		logout(state) {
			localStorage.removeItem("user");
			state.isLoggedIn = false;
			state.currentUser = null;
		}
	}, 

	actions: {
		login(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('http://192.168.1.27:3030/api/users/login', credentials)
					.then(response => {
						context.commit("loginSuccess", response.data);
						resolve();
					})
					.catch(error => {
						context.commit('authFailed', error.response?.data);
						reject();
					})
			});
		},

		signup(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('http://192.168.1.27:3030/api/users/signup', credentials)
					.then(() => {
						context.commit("signUpSuccess");
						resolve();
					})
					.catch((error) => {
						context.commit('authFailed', error.response?.data);
						reject();
					})
			});
		},

		update(context, credentials) {
			transport.patch(`http://192.168.1.27:3030/api/users/${credentials.id}`, credentials)
				.then(response => {
					context.commit("loginSuccess", response.data);
				})
				.catch(error => {
					console.log(error, error.response.data);
					context.commit('authFailed', error.response.data);
				});
		},

		delete(context, credentials) {
			const header = { headers: { Authorization: `Bearer ${context.getters.currentUser.token}` } };

			return new Promise((resolve, reject) => {
				axios.delete('localhost:3030/api/auth/delete', credentials, header)
					.then((response) => {
						context.commit("loginSuccess", response.data);
						resolve();
					})
					.catch((error) => {
						context.commit('authFailed', error.response.data.error);
						reject();
					})
			});
		}
	}
};