<template>
	<div v-if="msg" :class="{ show: msg }" class="toast d-flex align-items-center top-end text-white" role="alert" aria-live="assertive" aria-atomic="true" >
		<div class="toast-body">
			{{ msg }}
		</div>
		<button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Close" @click="hide"></button>
	</div>
</template>

<script>
export default {
	name: "toast-msg",

	props: {
		msg: {
			type: String,
			required: false
		}
	},

	watch: {
		msg: {
			immediate: true,
			handler(value) {
				if(value) {
					setTimeout(() => {
						this.$store.commit("setToastMsg", null);
					}, 5000);
				}
			}
		}
	},

	methods: {
		hide() {
			this.$store.commit("setToastMsg", null);
		}
	}
}
</script>

<style scoped>
.toast {
	width: 250px;
	animation: fadein 1.5s;
	z-index: 999;
}
@keyframes fadein {
  from {top: 0; opacity: 0;}
  to {top: 104px; opacity: 1;}
}

.top-end {
	right: 0;
	top: 104px;
	background-color: #0021bf8c;
	position: fixed;
}

/* Responsive layout - makes a one column layout instead of a two-column layout */
@media (max-width: 800px) {
  .toast {
		width: 90%;
	}
	@keyframes fadein {
		from {top: 0; opacity: 0;}
		to {top: 5px; opacity: 1;}
	}

	.top-end {
		top: 5px;
		left: 50%;
    transform: translateX(-50%);
	}
}
</style>