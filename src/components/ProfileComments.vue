<template>
	<div v-if="comments && Object.getOwnPropertyNames(comments).length > 0">
		<div class="mt-3 mb-2 border-bottom" v-for="groupedComments in comments" :key="groupedComments.id">
			<router-link class="text-dark" :to="`/post/${groupedComments[0].post._id}`">
				<h3>{{ groupedComments[0].post.title }}</h3>
			</router-link>

			<div class="comment-list">
				<!-- Comment-->
				<PostComments class="comment mb-4" 
					v-for="comment in groupedComments" 
					:key="comment._id" 
					:comment="comment"
					:done="done"
					@update="updateComment"
					@remove="deleteComment" />					
			</div>
		</div>
	</div>

	<div v-else>
		<div class="p-5 text-center">
			<h3>No comments!</h3>
		</div>
	</div>
</template>

<script>
import PostComments from "./PostComments";

export default {
	name: "profile-comments",

	data() {
		return {
			comments: null
		}
	},

	props: {
		user: {
			type: Object,
			required: true
		},
		done: {
			type: Boolean,
			required: true
		}
	},

	components: {
		PostComments
	},

	created() {
		this.groupCommentsByPost();
	},

	updated() {
		this.groupCommentsByPost();
	},

	methods: {
		groupCommentsByPost() {
			if(this.user.comments.length > 0) {
				this.comments = this.user.comments.reduce((comment, obj) => {
					comment[obj.post.title] = comment[obj.post.title] || [];
					comment[obj.post.title].push(obj);
					return comment
				},{});
			} else {
				this.comments = null;
			}
		},
		updateComment(form) {
			this.$emit("updateComment", form);
		},
		deleteComment(id) {
			this.$emit("deleteComment", id);
		}
	}
}
</script>