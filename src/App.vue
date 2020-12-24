<template>
  <div id="app" class="view-height">
		<HeaderApp />

		<div class="body-height">
			<ToastMsg :msg="toastMsg" />

			<router-view></router-view>
		</div>

		<FooterApp />
  </div>
</template>

<script>
import HeaderApp from "./components/HeaderApp";
import FooterApp from "./components/FooterApp";
import ToastMsg from "./components/ToastMsg";
import { mapGetters } from "vuex";

export default {
	name: 'App',

	components: {
		HeaderApp,
		FooterApp,
		ToastMsg
	},

	computed: {
		...mapGetters({
			toastMsg: "toastMsg"
		})
	}
}
</script>

<style>
@import url("./assets/styles/custom.css");
@import url("https://pro.fontawesome.com/releases/v5.10.0/css/all.css");
</style>

<style scoped>
.view-height {
	min-height: 100vh;
}
</style>