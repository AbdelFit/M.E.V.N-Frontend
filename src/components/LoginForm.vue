<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }">
			<form @submit.prevent="handleSubmit(auth)">
				<div class="form-group row" v-if="authError">
					<p class="text-center text-danger">{{ authError }}</p>
				</div>
				
				<ValidationProvider name="auth" rules="required" v-slot="{ errors }">
					<div class="mb-3">
						<label class="color-secondary" for="name">Email Address or Username*</label>
						<input class="form-control" v-model="form.auth" type="text" placeholder="Email Address or username" />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
					<div class="mb-3">
						<label class="color-secondary" for="name">Password*</label>
						<input class="form-control" v-model="form.password" type="password" placeholder="Password should be at least 8 characters" />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<div>
					<button class="btn btn-tertiary" type="submit">
						submit
					</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
export default {
	name: "login-form",

	data() {
		return {
			form: {
				auth: null,
				password: null
			}
		}
	},

	props: {
		authError: {
			type: String,
			required: false
		}
	},

	methods: {
		auth() {
			this.$emit('auth', this.form);
		}
	}
}
</script>