<template>
	<div class="container-sm col-lg-8">
		<ModalPost :post="postModal" :toggleModal="toggleModal" :show="show" @save="savePost" :mode="mode" />

		<Create class="mt-5" @openModal="openModal" />

		<Search class="my-5" />

		<template v-if="posts && posts.length > 0">
			<Post class="post" v-for="post in posts" :key="post._id" :post="post" @delete="deletePost" @openModal="openModal" />
		</template>

		<div v-else>
			<h3 class="text-danger text-center">No posts found!</h3>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../../components/PostIndex";
import Search from "../../components/PostSearch";
import Create from "../../components/PostCreate";
import ModalPost from "../../components/ModalPost";
import transport from "../../helpers/transport";

export default {
	name: 'post-index',

	data() {
		return {
			show: false,
			mode: "",
			postModal: {}
		}
	},

	components: {
		Post,
		Search,
		Create,
		ModalPost
	},

	computed: {
		...mapGetters({
			posts: 'posts'
		})
	},

	created() {
		this.getPosts();
	},

	methods: {
		getPosts() {
			this.$store.dispatch("getPosts");
		},
		savePost(data) {
			if(data.mode == "New") {
				transport.post("http://192.168.1.27:3030/api/posts", data.post)
					.then(() => this.$store.dispatch("getPosts"))
					.catch((error) => {
						this.$store.commit("setToastMsg", error.response.data);
					});
			} else {
				transport.patch(`http://192.168.1.27:3030/api/posts/${data.post._id}`, data.post)
					.then(() => this.$store.dispatch("getPosts"))
					.catch((error) => {
						this.$store.commit("setToastMsg", error.response.data);
					});
			}
		},
		deletePost(id) {
			transport.delete(`http://192.168.1.27:3030/api/posts/${id}`)
				.then(() => this.$store.dispatch("getPosts"))
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		openModal(data) {
			this.mode = data.mode;
			this.postModal = {...data.post};
			this.toggleModal();
		},
		toggleModal() {
			this.show = !this.show;
		}
	}
}
</script>

<style scoped>
.post {
	border: 1px solid #c0bfbf;
	border-radius: 10px;
	padding: 10px;
	margin: 15px 0;
}
</style>