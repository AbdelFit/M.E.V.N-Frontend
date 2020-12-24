<template>
	<div class="post">
		<div class="post-wrapper">
			<div class="post-header">
				<div class="flex">
					<div class="post-title">
						{{ post.title }}
					</div>

					<div v-if="currentUser.id === post.user._id" class="dropdown px-2">
						<span class="tooltip-test" title="Options" type="button" :id="`dropdown_${post._id}`" data-bs-toggle="dropdown" aria-expanded="false">
							<i class="fas fa-ellipsis-v color-tertiary"></i>
						</span>
						<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" :aria-labelledby="`dropdown_${post._id}`">
							<li><a class="dropdown-item" href="#" @click.prevent="toggleModal">Edit</a></li>
							<li><a class="dropdown-item" href="#" @click.prevent="remove">Delete</a></li>
						</ul>
					</div>
				</div>

				<div class="post-meta">
					<small>
						{{ post.date | longDateFormat }} | by 
						<router-link :to="`/user/${post.user._id}`">@{{ post.user.username }}</router-link>
					</small>
				</div>
			</div>

			<div class="post-content">
				<pre>{{ post.text }}</pre>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "post-show",

	computed: {
		...mapGetters({
			currentUser: "currentUser"
		})
	},

	props: {
		post: {
			type: Object,
			required: true
		},
		toggleModal: {
			type: Function,
			required: true
		}
	},

	methods: {
		remove() {
			this.$emit("remove", this.post);
		}
	}
}
</script>

<style scoped>
/* post */
.post {
	border-bottom: 1px solid #045762;
}
.post-content,
.post-header {
	margin: 0 0 30px;
}
.post-title {
	font-weight: 700;
	font-size: 2rem;
	margin-bottom: 8px;
	color: #000;
	text-transform: capitalize;
	margin: 0;
}
.post-content > pre {
	color: #000;
}
.post-meta {
	color: gray;
	font-size: 1rem;
	padding: 0;
	margin: 0;
}
.post-meta > small > a {
  color: #045762;
}
.post-meta > small > a:hover {
  color: #000;
}

/* drop down */
.fas {
	background-color: transparent;
	padding: 10px 15px;
	border-radius: 50%;
}
.fas:hover {
	background-color: #4e8d7c;
}
.dropdown-menu {
	min-width: auto;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-self: center;
	align-items: center;
}
</style>