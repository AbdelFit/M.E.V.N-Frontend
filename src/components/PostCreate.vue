<template>
	<div>
		<div class="post-add">
			<span class="post-user tooltip-test" :title="`@${currentUser.username}`">
				<router-link :to="`/user/${currentUser.id}`">{{ currentUser.username.charAt(0) }}</router-link>
			</span>
			<span class="post-content text-center" @click="open">
				<i class="far fa-edit"></i>
				<span>Add new post ?</span>
			</span>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "post-create",

	computed: {
		...mapGetters({
			currentUser: "currentUser"
		})
	},

	methods: {
		open() {
			this.$emit("openModal", { mode: "New", post: {} });
		}
	}
}
</script>

<style scoped>
.post-add {
	padding: 20px 15px;
	border: 1px solid #4e8d7c;
	border-radius: 15px;
	width: 90%;
	margin: 0 auto;
	background-color: #4e8d7c;
}
.post-user {
	min-width: 50px;
	min-height: 150px;
	padding: 15px 20px;
	text-transform: uppercase;
	margin-right: 15px;
	border: 1px solid #4e8d7c;
	border-radius: 50%;
	background-color: #fff;
}
.post-user > a {
	color: #045762;
}
.post-content {
	border: 1px solid #4e8d7c;
	border-radius: 15px;
	display: inline-block;
	width: 90%;
	padding: 10px 5px;
	color: #c0bfbf;
	background-color: #fff;
	cursor: pointer;
}
.post-user:hover,
.post-content:hover {
	border-color: #c0bfbf;
	color: gray;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 1024px) {
  .post-content {
		width: 85%;
	}
}

@media (max-width: 768px) {
  .post-content {
		width: 85%;
	}
}

@media (max-width: 540px) {
  .post-content {
		width: 75%;
	}
}

@media (max-width: 320px) {
  .post-content {
		width: 65%;
	}
}

@media (max-width: 280px) {
	.post-content > i {
		display: none;
	}
}
</style>