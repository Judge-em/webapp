<template>
	<div class="login-page">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12 col-md-7 px-0 px-sm-3">
				<login-card></login-card>
			</div>
		</div>
	</div>
</template>
<script>
import LoginCard from "./content/LoginCard.vue";
export default {
	components: {
		LoginCard
	}
};
</script>
