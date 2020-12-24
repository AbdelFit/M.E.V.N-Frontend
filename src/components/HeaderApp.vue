<template>
	<nav class="navbar navbar-expand-lg">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">MEVN</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon">
					<i class="far fa-stream text-white"></i>
				</span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto">
					<template v-if="!isLoggedIn">
						<li class="nav-item">
							<router-link class="nav-link" to="/signup">Sign Up</router-link>
						</li>
					</template>

					<template v-else>
						<li class="nav-item">
							<router-link class="nav-link" to="/">Home</router-link>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								{{ currentUser.username }}
							</a>

							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><router-link class="dropdown-item" :to="`/user/${currentUser.id}`">Profile</router-link></li>
								<li><a class="dropdown-item" role="button" to="#" @click.prevent="logout">Logout</a></li>
							</ul>
						</li>
					</template>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "header-app",

	computed: {
		...mapGetters({
			currentUser: "currentUser",
			isLoggedIn: "isLoggedIn"
		})
	},

	methods: {
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		}
	}
}
</script>

<style scoped>
.navbar {
	background-color: #4e8d7c;
}
.navbar-brand,
.nav-link {
	color: #f3f2da;
}
.navbar-brand:hover,
.nav-link:hover {
	color: #045762;
}
.nav-item {
	margin-right: 20px;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .navbar-toggler {
		border-color: #fff !important;
	}
	.navbar-toggler:focus {
		box-shadow: 0 0 0 0;
	}
	.navbar-toggler-icon {
		width: auto;
		height: auto;
	}
	ul {
		margin-top: 1rem;
		border-top: 1px solid #045762;
	}
}
</style>