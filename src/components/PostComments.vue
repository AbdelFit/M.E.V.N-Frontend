<template>
	<div>
		<div class="comment-body">
			<div class="comment-meta">
				<div class="comment-meta-author">
					<div class="flex">
						<span>by <router-link :to="`/user/${comment.user._id}`">@{{ comment.user.username }}</router-link></span>

						<div v-if="currentUser.id === comment.user._id" class="dropdown px-2">
							<span type="button" class="tooltip-test" title="Options" :id="`dropdown_${comment._id}`" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="fas fa-ellipsis-v color-tertiary"></i>
							</span>
							<ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" :aria-labelledby="`dropdown_${comment._id}`">
								<li><button class="dropdown-item" @click.prevent="update">Edit</button></li>
								<li><a class="dropdown-item" @click.prevent="remove" href="#">Delete</a></li>
							</ul>
						</div>
					</div>

					<small>{{ comment.date | longDateFormat }}</small>
				</div>
			</div>
			<div class="comment-content">
				<pre v-if="!edit">{{ comment.text }}</pre>

				<div v-else>
					<form class="comment-form row mb-3" @submit.prevent="save">
						<div class="form-group col-md-12">
							<textarea class="form-control" rows="3" placeholder="Comment" v-model="form.text"></textarea>
						</div>

						<div class="form-submit col-md-12 mt-3">
							<div class="flex">
								<button class="btn btn-danger" @click.prevent="cancel">Cancel</button>
								<button class="btn btn-tertiary" type="submit">Save</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "post-comments",

	data() {
		return {
			edit: false,
			form: {
				text: null
			}
		}
	},

	props: {
		comment: {
			type: Object,
			required: true
		},
		done: {
			type: Boolean,
			required: true
		}
	},

	watch: {
		done: {
			immediate: true,
			handler(value) {
				if(value) {
					this.edit = false;
				}
			}
		}
	},

	computed: {
		...mapGetters({
			currentUser: "currentUser"
		})
	},

	methods: {
		save() {
			this.form.id = this.comment._id;
			this.$emit("update", this.form);
		},
		update() {
			this.edit = true;
			this.form.text = this.comment.text;
		},
		remove() {
			this.$emit("remove", this.comment._id);
		},
		cancel() {
			this.form.text = null;
			this.edit = false;
		}
	}
}
</script>

<style scoped>
.comment-body {
	position: relative;
}
.comment-meta {
	margin: 0 0 10px;
}
.comment-meta-author {
	color: gray;
	font-size: 90%;
}
.comment-meta-author span a {
	opacity: 1;
	color: #045762;
}
.comment-meta-author span a:hover {
	color: #000;
}
.comment-list {
  margin-top: 25px;
}
.comment-content > pre {
	padding: 0;
	margin: 0;
	color: #000;
}
.comment-form {
	padding-right: 15px;
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
.dropdown-menu {
	min-width: auto;
	border: 1px solid #045762;
	background-color: #045762;
}
.dropdown-item {
	color:  #f3f2f2;
}
.dropdown-item:hover,
.dropdown-item:focus {
	background-color: #4e8d7c;
}

.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-self: center;
	align-items: center;
}
</style>