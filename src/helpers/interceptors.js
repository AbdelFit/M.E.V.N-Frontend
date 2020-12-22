const request = (store, axios) => {
	axios.interceptors.request.use(
		config => {
			const token = store.getters.currentUser.token
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`;
			}

			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);
}

const response = (store, router, axios) => {
	axios.interceptors.response.use(null, (error) => {
		if (error.response.status === 401) {
			store.commit('setToastMsg', error.response.data);
			store.commit('logout')
			router.push('/login')
		} else if (error.response.status === 404) {
			store.commit('setToastMsg', 'Page not found!');
			router.push('/')
		} else if (error.response.status === 400) {
			store.commit('setToastMsg', error.response.data);
			console.log(error.response.data);
			router.push('*')
		}

		return Promise.reject(error)
	});
}

export {
	request,
	response
}