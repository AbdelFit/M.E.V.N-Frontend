<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }">
			<form @submit.prevent="handleSubmit(save)">
				<div class="form-group row" v-if="authError">
					<p class="text-center text-danger">{{ authError }}</p>
				</div>
				
				<div class="flex mt-4">
					<h4>Change Username</h4>
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="username" :value="form_show.username" v-model="form_show.username">
					</div>
				</div>
				<ValidationProvider v-if="form_show.username" name="username" rules="required" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">Username*</label>
						<input class="form-control" v-model="form.username" type="text" placeholder="Username..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<div class="flex mt-4">
					<h4>Change Bio</h4>
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="bio" :value="form_show.bio" v-model="form_show.bio">
					</div>
				</div>
				<ValidationProvider v-if="form_show.bio" name="bio" rules="max:250" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">Bio</label>
						<textarea class="form-control" v-model="form.bio" placeholder="Bio..." rows="3" />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<div class="flex mt-4">
					<h4>Change Password</h4>
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="password" :value="form_show.password" v-model="form_show.password">
					</div>
				</div>
				<ValidationProvider v-if="form_show.password" name="Old Password" rules="required|min:8" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">Old Password*</label>
						<input class="form-control" v-model="form.oldPassword" type="password" placeholder="Old password..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<ValidationProvider v-if="form_show.password" name="New Password" rules="required|min:8" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">New Password*</label>
						<input class="form-control" v-model="form.newPassword" type="password" placeholder="New password..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<div class="flex mt-4" v-if="form_show.username || form_show.bio || form_show.password">
					<button class="btn btn-danger" @click="cancel">Cancel</button>
					<button class="btn btn-dark" type="submit">Save</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
export default {
	name: "profile-edit",

	data() {
		return {
			form: {
				username: null,
				oldPassword: null,
				newPassword: null,
				bio: null
			},
			form_show: {
				username: false,
				bio: false,
				password: false
			}
		}
	},

	props: {
		user: {
			type: Object,
			required: true
		},
		authError: {
			type: String,
			required: false
		}
	},

	created() {
		this.getUsername();
	},

	methods: {
		save() {
			this.$emit("update", this.form);
		},
		getUsername() {
			this.form.username = this.user.username;
			this.form.bio = this.user.bio;
		},
		cancel() {
			this.form_show = {
				username: false,
				bio: false,
				password: false
			}
		}
	}
}
</script>

<style scoped>
.flex {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-self: center;
	align-items: center;
}
</style>