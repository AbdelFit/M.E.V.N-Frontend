<template>
	<div class="container-sm d-sm-flex justify-content-center">
		<div class="border rounded-3 my-5 p-3">
			<h1 class="mb-5">Sign Up</h1>
			<hr class="mb-5">

			<SignUpForm :authError="authError" @auth="signup" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import SignUpForm from "../../components/SignUpForm";

export default {
	name: "signup",

	components: {
		SignUpForm
	},

	computed: {
		...mapGetters({
			authError: "authError"
		})
	},

	methods: {
		signup(form) {
			this.$store
				.dispatch("signup", form)
				.then(() => this.$router.push("/login"));
		}
	}
}
</script>