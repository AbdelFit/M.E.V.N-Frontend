<template>
	<div class="body-height justify-content-center">
		<ModalPost :post="{...post}" :toggleModal="toggleModal" :show="show" mode="Edit" @save="updatePost" modal="Edit" />

		<div class="container col-lg-8 bg my-5">
			<PostShow :post="post" :toggleModal="toggleModal" @remove="deletePost" />

			<div class="comments-area">
				<h5 class="comments-title">
					{{ post.comments.length }} 
					<span v-if="post.comments.length > 0">Comments</span>
					<span v-else>Comment</span>
				</h5>

				<div class="comment-list">
					<!-- Comment-->
					<PostComments class="comment" 
						v-for="comment in post.comments" 
						:key="comment._id" 
						:comment="comment"
						:done="done"
						@update="updateComment"
						@remove="deleteComment" />					
				</div>

				<div class="comment-respond">					
					<form class="comment-form row" @submit.prevent="addComment">
						<div class="form-group col-md-12">
							<textarea class="form-control" rows="1" placeholder="Leave a comment..." v-model="form_comment.text"></textarea>
						</div>
						<div class="form-submit col-md-12 mt-3">
							<button class="btn btn-tertiary" type="submit">Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import transport from "../../helpers/transport";
import PostComments from "../../components/PostComments";
import PostShow from "../../components/PostShow";
import ModalPost from "../../components/ModalPost";

export default {
	name: "post-show",

	data() {
		return {
			post: {
				_id: null,
				title: null,
				text: null,
				user: {},
				comments: {}
			},
			form_post: {
				title: null,
				text: null
			},
			form_comment: {
				post: null,
				text: null
			},
			done: false,
			show: false
		}
	},

	components: {
		PostComments,
		PostShow,
		ModalPost
	},

	created() {
		this.getPosts()
	},

	computed: {
		...mapGetters({
			posts: "posts"
		})
	},

	watch: {
		posts: {
			immediate: true,
			handler(value) {
				if(value.length > 0) {
					this.getPost();
				}
			}
		}
	},

	methods: {
		getPosts() {
			this.$store.dispatch("getPosts");
		},
		getPost() {
			this.post = this.posts.find(post => post._id == this.$route.params.id);

			if(!this.post) {
				this.$router.push('/');
				this.$store.commit("setToastMsg", "Post not found!");
			}
		},
		updatePost(form) {
			transport.patch(`http://192.168.1.27:3030/api/posts/${form._id}`, form)
				.then(() => {
					this.$store.dispatch("getPosts");
				})
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		deletePost() {
			transport.delete(`http://192.168.1.27:3030/api/posts/${this.post._id}`)
				.then(() => {
					this.$store.dispatch("getPosts");
					this.$router.push("/");
				})
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		addComment() {
			this.form_comment.post = this.post._id;

			transport.post("http://192.168.1.27:3030/api/comments", this.form_comment)
				.then(() => {
					this.$store.dispatch("getPosts");
					this.form_comment.text = null;
				})
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		updateComment(form) {
			this.done = false;
			transport.patch(`http://192.168.1.27:3030/api/comments/${form.id}`, form)
				.then(() => {
					this.$store.dispatch("getPosts");
					this.done = true;
				})
				.catch((error) => {
					this.done = true;
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		deleteComment(id) {
			transport.delete(`http://192.168.1.27:3030/api/comments/${id}`)
				.then(() => {
					this.$store.dispatch("getPosts");
				})
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
				});
		},
		toggleModal() {
			this.done = true;
			this.show = !this.show;
		}
	}
}
</script>

<style scoped>
.bg {
	background-color: #fff;
	padding: 2rem;
	border: 1px solid #045762;
	border-radius: 10px;
}
/* comment */
.comment {
	border: 1px solid #045762;
	border-radius: 10px;
	padding: 10px 0 10px 15px;
	margin: 10px 0;
}
.comments-area {
	margin-top: 30px;
}
.comment-respond {
	margin-top: 30px;
	border-top: 1px solid #045762;
	padding-top: 30px;
}
.form-control {
	border: 1px solid #045762;
	border-radius: 10px;
}

@media (max-width: 800px) {
  .bg {
		max-width: 90%;
		padding: 1rem;
	}
}
</style>