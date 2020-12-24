<template>
	<div>
		<div class="bg-img p-5 d-flex">
			<div class="rounded-3 p-3 bg">
				<h1 class="mb-3">Login</h1>
				<hr class="color-tertiary">

				<LoginForm :authError="authError" @auth="login" />
			</div>
		</div>

		<div class="container flex-content">
			<div>
				<img class="rounded-3" src="https://images.pexels.com/photos/2740954/pexels-photo-2740954.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
			</div>

			<div class="flex-col">
				<div>
					<h1>
						Welcome to <span class="color-secondary">MEVN</span>
					</h1>
				</div>
				<div class="mt-3">
					<h3 class="text-muted text-center">
						Sign in and start seeing all the posts <br> or posting new ones.
					</h3>
				</div>
			</div>
		</div>

		<div class="container flex-content mb-5">
			<div class="flex-col ord1">
				<div>
					<h1 class="color-secondary">Not subscribed yet ?</h1>
				</div>
				<div class="mt-2">
					<h3>Dont wait anymore, start now !</h3>
				</div>
				<div class="mt-3">
					<router-link class="btn btn-tertiary" to="/signup">Sign Up</router-link>
				</div>
			</div>

			<div class="ord2">
				<img class="rounded-3" src="https://images.pexels.com/photos/5588201/pexels-photo-5588201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="600" height="400">
			</div>
		</div>
	</div>
</template>

<script>
import LoginForm from "../components/LoginForm";
import { mapGetters } from "vuex";

export default {
	name: "home",

	components: {
		LoginForm
	},

	computed: {
		...mapGetters({
			authError: "authError"
		})
	},

	methods: {
		login(form) {
			this.$store
				.dispatch("login", form)
				.then(() => this.$router.push("/"));
		}
	}
}
</script>

<style scoped>
.d-flex {
	justify-content: start;
}
.bg {
	background-color: #f3f2da;
	border: 1px solid #045762;
}
.bg > h1 {
	color: #045762;
}
.bg-img {
	background-image: url("https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
	background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.flex-content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 1rem;
	margin-top: 150px;
}
.flex-content img {
	width: 600px;
	height: 400px;
}
.flex-col {
	display: flex;
	flex-direction: column;
	align-self: center;
	align-items: center;
	text-align: center;
}
.ord1 {
	order: 1;
}
.ord2 {
	order: 2;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 1024px) {
	.flex-content img {
		width: 400px;
		height: 300px;
	}
}

@media (max-width: 768px) {
	.d-flex {
		justify-content: center;
	}
  .flex-content {
    flex-direction: column;
		align-self: center;
		align-items: center;
		margin-top: 100px;
  }
	.flex-col {
		margin-top: 2rem;
	}
	.ord1 {
		order: 2;
	}
	.ord2 {
		order: 1;
	}
}

@media (max-width: 375px) {
	.flex-content img {
		width: 300px;
		height: 250px;
	}
}

@media (max-width: 280px) {
	.flex-content img {
		width: 250px;
		height: 200px;
	}
}
</style>