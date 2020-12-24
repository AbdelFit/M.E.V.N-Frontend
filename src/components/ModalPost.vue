<template>
	<div class="modal" tabindex="-1" :style="[show ? { 'display': 'block' } : { 'display': 'none' } ]" id="staticBackdrop" data-bs-backdrop="static">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title text-center" id="staticBackdropLabel">{{ mode }} post</h3>
				</div>

				<ValidationObserver v-slot="{ handleSubmit }">
					<form @submit.prevent="handleSubmit(save)">							
						<div class="modal-body">
							<ValidationProvider name="title" rules="required|max:80" v-slot="{ errors }">
								<div class="mb-3">
									<label for="name">Title*</label>
									<input class="form-control" v-model="post.title" type="text" placeholder="Title..." />
									<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
								</div>
							</ValidationProvider>

							<ValidationProvider name="text" rules="required" v-slot="{ errors }">
								<div class="mb-3">
									<label for="name">Content*</label>
									<textarea class="form-control" rows="3" v-model="post.text" placeholder="Content..." />
									<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
								</div>
							</ValidationProvider>
						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-danger" @click="toggleModal">Close</button>
							<button type="submit" class="btn btn-tertiary">Save</button>
						</div>
					</form>
				</ValidationObserver>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "modal-post",

	props: {
		post: {
			type: Object,
			required: true
		},
		show: {
			type: Boolean,
			required: true
		},
		toggleModal: {
			type: Function,
			required: true
		},
		mode: {
			type: String,
			required: true
		}
	},

	methods: {
		save() {
			if(this.post.title && this.post.text) {
				this.$emit("save", { mode: this.mode, post: this.post });
				this.toggleModal();
			}
		}
	}
}
</script>

<style scoped>
.modal {
	background-color: rgba(62, 62, 63, 0.5);
}
.modal-content {
	background-color: #fff;
	color: #045762;
	box-shadow: 5px 5px 5px 5px grey;
}
.modal-header {
	border-bottom-color: #045762;
	display: inline-block;
}
.form-control {
	background-color: #f3f2da;
	color: #000;
}
.form-control::placeholder {
	color: rgba(219, 219, 219, 0.534);
}
.modal-footer {
	justify-content: space-between;
	border-top-color: #045762;
}
label {
	font-size: larger;
}

/* textarea scrollbar */
textarea::-webkit-scrollbar-track
{
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}
textarea::-webkit-scrollbar
{
	width: 6px;
	background-color: #F5F5F5;
}
textarea::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
</style>