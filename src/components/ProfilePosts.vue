<template>
	<div v-if="user.posts.length > 0">
		<Modal :post="postModal" :toggleModal="toggleModal" :show="show" @save="savePost" mode="Edit" />

		<Post class="post" v-for="post in user.posts" :key="post._id" :post="post" @delete="deletePost" @openModal="openModal" />
	</div>

	<div v-else>
		<div class="p-5 text-center">
			<h3>No posts!</h3>
		</div>
	</div>
</template>

<script>
import Post from "./PostIndex";
import Modal from "./ModalPost";

export default {
	name: "profile-posts",

	components: {
		Post,
		Modal
	},

	data() {
		return {
			show: false,
			postModal: {}
		}
	},

	props: {
		user: {
			type: Object,
			required: true
		}
	},

	methods: {
		openModal(data) {
			this.postModal = {...data.post};
			this.toggleModal();
		},
		toggleModal() {
			this.show = !this.show;
		},
		savePost(data) {
			this.$emit("savePost", data);
		},
		deletePost(id) {
			this.$emit("deletePost", id);
		}
	}
}
</script>

<style scoped>
.post {
	border: 1px solid #045762;
	border-radius: 10px;
	padding: 10px;
	margin: 15px 0;
	background-color: #fff;
}
</style>