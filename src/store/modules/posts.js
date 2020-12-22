import transport from '../../helpers/transport';

export default {
	state: {
		posts: []
	}, 

	getters: {
		posts(state) {
			return state.posts;
		}
	},

	mutations: {
		setPosts(state, payload) {
			state.posts = payload;
		}
	}, 

	actions: {
		getPosts(context, query = null) {
			const q = query ? `/search?q=${query}` : '';
			transport.get(`http://192.168.1.27:3030/api/posts${q}`)
				.then(res => context.commit('setPosts', res.data))
				.catch(error => context.commit('setToastMsg', error.response.data));
		}
	}
};