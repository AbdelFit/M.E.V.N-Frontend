<template>
	<div class="container-sm d-flex justify-content-center align-items-center hg">
		<div class="bg">
			<h1 class="mb color-tertiary">Sign Up</h1>
			<hr class="mb color-tertiary">

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

<style scoped>
.hg {
	height: calc(100vh - 112px);
}
.bg {
	background-color: #fff;
	border: 1px solid #7d7800;
	border-radius: .3rem;
	padding: 1rem;
	width: 30%;
	height: fit-content;
}
.mb {
	margin-bottom: 3rem;
}
.d-flex {
	flex-direction: column;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .bg {
		width: fit-content;
		vertical-align: middle;
		align-self: center;
		display: table-cell;
	}
	.mb {
		margin-bottom: 1rem;
	}
}
</style>