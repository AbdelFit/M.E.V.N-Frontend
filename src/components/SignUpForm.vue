<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }">
			<form @submit.prevent="handleSubmit(auth)">
				<div class="form-group row" v-if="authError">
					<p class="text-center text-danger">{{ authError }}</p>
				</div>
				
				<ValidationProvider name="username" rules="required|alpha|min:3" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">Username*</label>
						<input class="form-control" v-model="form.username" type="text" placeholder="Username..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">E-mail*</label>
						<input class="form-control" v-model="form.email" type="text" placeholder="E-mail..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
					<div class="mb-3">
						<label for="name">Password*</label>
						<input class="form-control" v-model="form.password" type="password" placeholder="Password should be at least 8 characters..." />
						<small class="text-sm text-danger font-italic">{{ errors[0] }}</small>
					</div>
				</ValidationProvider>

				<div>
					<button class="btn btn-primary" type="submit">
						submit
					</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
export default {
	name: "signup-form",

	data() {
		return {
			form: {
				username: null,
				email: null,
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