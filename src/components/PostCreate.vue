<template>
	<div>
		<div class="post-add">
			<span class="post-user tooltip-test" :title="`@${currentUser.username}`">
				<router-link :to="`/user/${currentUser.id}`">{{ currentUser.username.charAt(0) }}</router-link>
			</span>
			<span class="post-content" @click="open">Add new post ?</span>
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
	border: 1px solid #c0bfbf;
	border-radius: 15px;
	width: 90%;
	margin: 0 auto;
	background-color: #c9c9c9;
}
.post-user {
	min-width: 50px;
	min-height: 150px;
	padding: 15px 20px;
	text-transform: uppercase;
	margin-right: 15px;
	border: 1px solid #c0bfbf;
	border-radius: 50%;
	background-color: #fff;
}
.post-content {
	border: 1px solid #c0bfbf;
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
	border-color: #838383;
	color: #838383;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .post-content {
		width: 68%;
	}
}
</style>