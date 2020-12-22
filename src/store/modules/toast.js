export default {
	state: {
		toast_msg: null
	}, 

	getters: {
		toastMsg(state) {
			return state.toast_msg;
		}
	},

	mutations: {
		setToastMsg(state, payload) {
			state.toast_msg = payload;
		}
	}, 

	actions: {
		
	}
};