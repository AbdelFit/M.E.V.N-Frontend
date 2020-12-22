<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<router-link class="navbar-brand" to="/">MEVN</router-link>

			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<template v-if="!isLoggedIn">
						<li class="nav-item">
							<router-link class="nav-link" to="/signup">Sign Up</router-link>
						</li>
					</template>

					<template v-else>
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