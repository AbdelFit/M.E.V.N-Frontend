import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import posts from '@/store/modules/posts';
import toast from '@/store/modules/toast';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		posts,
		toast
	}
});