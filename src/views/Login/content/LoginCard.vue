<template>
	<el-card class="box-card">
		<div slot="header" class="text-center my-4">
			<h3 class="login-header">
				{{ $t("login.Login").toUpperCase() }}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column text-center px-0 px-sm-3"
		>
			<div class="col-12 col-lg-8 d-flex flex-column">
				<el-button
					type="primary"
					:icon="loading ? 'el-icon-loading' : 'fa fa-facebook fa-fw'"
					:disabled="loading"
					class="text-wrap mt-4 font-weight-bold"
					@click="logIn(PROVIDERS.FACEBOOK)"
					>{{ $t("login.LoginViaFacebook") }}</el-button
				>
				<el-button
					type="danger"
					:icon="loading ? 'el-icon-loading' : 'fa fa-google fa-fw'"
					:disabled="loading"
					class="ml-0 mt-2 text-wrap font-weight-bold"
					@click="logIn(PROVIDERS.GMAIL)"
					>{{ $t("login.LoginViaGmail") }}</el-button
				>
			</div>
			<h5 class="my-2 grey">{{ $t("login.Or") }}</h5>
			<div class="col-12 col-lg-8 d-flex flex-column mb-2">
				<el-button
					type="info"
					:icon="loading ? 'el-icon-loading' : 'el-icon-user-solid'"
					:disabled="loading"
					class="text-wrap mb-4 font-weight-bold"
					@click="logIn(PROVIDERS.GUEST)"
					>{{ $t("login.LoginAsGuest") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
import PROVIDERS from "../../../helpers/dictionaries/providers";

export default {
	data() {
		return {
			loading: false,
			PROVIDERS
		};
	},
	methods: {
		async logIn(provider) {
			this.loading = true;
			const result = await this.$auth.logIn(provider);
			console.log(result);
			this.loading = false;
		}
	}
};
</script>
<style></style>
