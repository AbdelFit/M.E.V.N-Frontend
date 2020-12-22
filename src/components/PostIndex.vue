<template>
	<div class="post-wrapper">
		<div class="post-header">
			<div class="flex">
				<div class="post-title">
					<router-link :to="`/post/${post._id}`">{{ post.title }}</router-link>
				</div>

				<div v-if="currentUser.id === post.user._id" class="dropdown px-2">
					<span class="tooltip-test" title="Options" type="button" :id="`dropdown_${post._id}`" data-bs-toggle="dropdown" aria-expanded="false">
						<i class="fas fa-ellipsis-v"></i>
					</span>
					<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" :aria-labelledby="`dropdown_${post._id}`">
						<li><a class="dropdown-item" href="#" @click="open">Edit</a></li>
						<li><a class="dropdown-item" href="#" @click="deletePost">Delete</a></li>
					</ul>
				</div>
			</div>

			<div class="post-meta">
				<small>
					{{ post.date | shortDateFormat }} | by
					<router-link :to="`/user/${post.user._id}`">@{{ post.user.username }}</router-link>
				</small>
			</div>
		</div>

		<div class="post-content">
			<p class="truncate-overflow">{{ post.text }}</p>
		</div>

		<div class="post-more flex">
			<router-link :to="`/post/${post._id}`">
				{{ post.comments.length }} 
				<span v-if="post.comments.length > 1">comments</span>
				<span v-else>comment</span>
			</router-link>
			
			<router-link :to="`/post/${post._id}`">Read more</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: 'post-container-index',

	props: {
		post: {
			type: Object,
			required: true
		}
	},

	computed: {
		...mapGetters({
			currentUser: "currentUser"
		})
	},

	methods: {
		open() {
			this.$emit("openModal", { mode: "Edit", post: this.post })
		},
		deletePost() {
			this.$emit("delete", this.post._id);
		}
	}
}
</script>

<style scoped>
.post-header {
	margin: 0 0 30px;
}
.post-header .post-title > a {
	font-weight: 700;
	font-size: 2rem;
	margin-bottom: 8px;
	color: #000;
	text-transform: capitalize;
}
.post-header .post-title > a:hover {
	color: #a3a6a8;
}
.post-meta {
	font-size: 1rem;
	padding: 0;
	margin: 0;
}
.post-more > a {
  color: #a3a6a8;
}
.post-meta > small > a:hover,
.post-more > a:hover {
  color: #000;
}
.post-content > p {
	color: #788487;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-self: center;
	align-items: center;
}

.truncate-overflow {
	overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* dropdown */
.fas {
	background-color: transparent;
	padding: 10px 15px;
	border-radius: 50%;
}
.fas:hover {
	background-color: #f3f2f2;
}
.dropdown-menu {
	min-width: auto;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .truncate-overflow {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 250px;
	}

	.post-header .post-title > a {
		font-size: 1rem;
	}
}
</style>