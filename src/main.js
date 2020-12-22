// bootstrap 5
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// imports
import Vue from 'vue';
import router from './router';
import store from './store';
import transport from './helpers/transport';
import { response, request } from './helpers/interceptors';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';
import App from './App.vue';

Vue.config.productionTip = false;

// components
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// http config
request(store, transport);
response(store, router, transport);
Vue.prototype.$http = transport;

// filters
Vue.filter('shortDateFormat', function (value) {
	if (!value) return '';

	const options = {timeZone:"UTC", month:"short", day:"2-digit", year:"numeric"};
	const formattedDate = new Date(value).toLocaleDateString("en-US", options);
	const sp = formattedDate.split(' ');
	return `${sp[0]} ${sp[1]} ${sp[2]}`;
});
Vue.filter('longDateFormat', function (value) {
	if (!value) return '';

	const options = {timeZone:"UTC", month:"short", day:"2-digit", year:"numeric", hour: "2-digit", minute:"2-digit"};
	const formattedDate = new Date(value).toLocaleDateString("en-US", options);
	const sp = formattedDate.split(' ');
	return `${sp[0]} ${sp[1]} ${sp[2]} at ${sp[3]}${sp[4]}`;
});

new Vue({
	router,
	store,
	components: {
		ValidationProvider,
		ValidationObserver
	},
	render: (h) => h(App),
}).$mount('#app');