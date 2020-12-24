<template>
	<div class="container-sm mt-5 col-lg-8">
		<div class="flex" v-if="!loading">
			<div class="sidebar">
				<div class="user-header">
					<span class="user-circle">{{ symbole }}</span>
				</div>
				<div class="user-content mt-4">
					<h4>@{{ user.username }}</h4>

					<div class="user-bio" v-if="user.bio">
						<pre>{{ user.bio }}</pre>
					</div>

					<div class="user-flex mt-3 p-1">
						<p @click="mode = 'posts'" class="tooltip-test" title="Posts">{{ user.posts.length }} posts</p>
						<p @click="mode = 'comments'" class="tooltip-test" title="Comments">{{ user.comments.length }} comments</p>
					</div>
				</div>
			</div>

			<div class="container bar">
				<div class="flex-bar">
					<span @click="mode = 'posts'" :class="[ mode == 'posts' ? 'active' : '' ]" class="tooltip-test" title="Posts"><i class="fad fa-th-large"></i></span>
					<span @click="mode = 'comments'" :class="[ mode == 'comments' ? 'active' : '' ]" class="tooltip-test" title="Comments"><i class="fad fa-comments-alt"></i></span>
					<span @click="mode = 'edit'" :class="[ mode == 'edit' ? 'active' : '' ]" class="tooltip-test" title="Update Profile" v-if="currentUser.id == user._id"><i class="fas fa-user-edit"></i></span>
				</div>

				<div class="content my-3">
					<ProfilePosts v-if="mode === 'posts'" :user="user" @savePost="savePost" @deletePost="deletePost" />
					<ProfileComments v-if="mode === 'comments'" :user="user" :done="done" @updateComment="updateComment" @deleteComment="deleteComment" />
					<ProfileEdit v-if="mode === 'edit'" :user="user" :authError="authError" @update="updateProfile" />
				</div>
			</div>
		</div>

		<div class="fa-3x text-center" v-else>
			<i class="fas fa-circle-notch fa-spin"></i>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import transport from "../../helpers/transport";
import ProfileEdit from "../../components/ProfileEdit";
import ProfilePosts from "../../components/ProfilePosts";
import ProfileComments from "../../components/ProfileComments";

export default {
	name: "profile",

	components: {
		ProfileEdit,
		ProfilePosts,
		ProfileComments
	},

	data() {
		return {
			user: {
				_id: null,
				username: null,
				posts: {},
				comments: {}
			},
			symbole: "",
			mode: "posts",
			done: false,
			loading: true
		}
	},

	computed: {
		...mapGetters({
			currentUser: "currentUser",
			authError: "authError"
		})
	},

	created() {
		this.getUser();
	},

	methods: {
		// User
		getUser() {
			this.loading = true;
			transport.get(`http://192.168.1.27:3030/api/users/${this.$route.params.id}`)
				.then(res => {
					this.user = res.data;
					this.symbole = this.user.username.charAt(0);
				})
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.$router.push('/');
				});
		},
		updateProfile(form) {
			this.loading = true;
			form.id = this.$route.params.id;
			this.$store
				.dispatch("update", form)
				.then(() => this.getUser())
				.then(() => this.mode = "posts")
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.mode = "posts";
					this.loading = false;
				});
		},

		// Posts
		savePost(data) {
			this.loading = true;
			transport.patch(`http://192.168.1.27:3030/api/posts/${data.post._id}`, data.post)
				.then(() => this.getUser())
				.then(() => this.mode = "posts")
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.mode = "posts";
					this.loading = false;
				});
		},
		deletePost(id) {
			this.loading = true;
			transport.delete(`http://192.168.1.27:3030/api/posts/${id}`)
				.then(() => this.getUser())
				.then(() => this.mode = "posts")
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.mode = "posts";
					this.loading = false;
				});
		},

		// Comments
		updateComment(form) {
			this.loading = true;
			this.done = true;
			transport.patch(`http://192.168.1.27:3030/api/comments/${form.id}`, form)
				.then(() => {
					this.done = false;
					this.getUser();
				})
				.then(() => this.mode = "comments")
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.mode = "comments";
					this.loading = false;
				});
		},
		deleteComment(id) {
			this.loading = true;
			transport.delete(`http://192.168.1.27:3030/api/comments/${id}`)
				.then(() => this.getUser())
				.then(() => this.mode = "comments")
				.then(() => this.loading = false)
				.catch((error) => {
					this.$store.commit("setToastMsg", error.response.data);
					this.mode = "comments";
					this.loading = false;
				});
		}
	}
}
</script>

<style scoped>
.user {
	margin: 20px 30px;
	align-self: center;
	justify-content: center;
}
.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.sidebar {
	border: 1px solid #045762;
	border-radius: 15px;
	background-color: #fff;
	padding: 10px 15px;
	margin: 15px;
	min-width: 150px;
	--offset: var(--space);
  flex-grow: 1;
  flex-basis: 300px;
  align-self: start;
  position: sticky;
  top: var(--offset);
}
.user-header {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
	padding: 10px 0;
	border-bottom: 1px solid #045762;
}
.user-circle {
	padding: 13px 20px;
	text-transform: uppercase;
	border: 1px solid #045762;
	border-radius: 50%;
	background-color: #045762;
	color: #fff;
}
.user-bio {
	margin: 15px 0;
	background-color: #045762;
	border-radius: 15px;
	padding: 8px;
}
.user-bio > pre {
	margin: 0;
	color: #fff;
}
.user-flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-top: 1px solid #045762;
}
.user-flex > p {
	margin: 0;
	cursor: pointer;
	color: #000;
}
.user-flex > p:hover {
	color: #045762;
}

.bar {
	margin-top: 15px;
}
.flex-bar {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-self: center;
	align-items: center;
	padding: 10px;
	margin-bottom: 10px;
	text-align: center;
	border-bottom: 1px solid#045762;
}
.flex-bar > span {
	color: #045762;
	cursor: pointer;
}
.flex-bar > span:hover {
	color: #000;
}
.flex-bar > span > i {
	font-size: xx-large;
}

.active {
	color: #000 !important;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 540px) {
	.sidebar {
		align-self: center;
		flex-basis: auto;
		width: 50%;
	}
  .flex {
		flex-direction: column;
	}
	.user-content {
		text-align: center;
	}
}
@media (max-width: 414px) {
	.sidebar {
		width: 68%;
	}
}
@media (max-width: 280px) {
	.sidebar {
		width: 90%;
	}
}
</style>