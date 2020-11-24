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
					@click="authWithFacebook()"
					>{{ $t("login.LoginViaFacebook") }}</el-button
				>
				<el-button
					type="danger"
					:icon="loading ? 'el-icon-loading' : 'fa fa-google fa-fw'"
					:disabled="loading"
					class="ml-0 mt-2 text-wrap font-weight-bold"
					@click="authWithGmail()"
					>{{ $t("login.LoginViaGmail") }}</el-button
				>
				<div class="g-signin2" data-onsuccess="onSignIn"></div>
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
	async created() {
		await this.loadFacebookSDK(document, "script", "facebook-jssdk");
		await this.initFacebook();
		// await this.initGoogle();
	},
	methods: {
		async logIn(provider, token = null) {
			await this.$auth.logIn(provider, token);
			this.loading = false;
			this.$notify.success({
				title: "Success",
				message: this.$t("login.Success")
			});
			this.$router.push({ name: "Home" });
		},
		async authWithFacebook() {
			this.loading = true;
			window.FB.login(async (response) => {
				if (response.authResponse) {
					const token = await window.FB.getAccessToken();
					this.logIn(PROVIDERS.FACEBOOK, token);
				} else {
					this.$notify.error({
						title: "Error",
						message: this.$t("login.Error")
					});
				}
			});
			this.loading = false;
		},
		// async initGoogle() {
		// 	window.gapi.load("auth2", function() {
		// 		window.gapi.auth2
		// 			.init({
		// 				client_id:
		// 					""
		// 			})
		// 			.then(
		// 				() => console.log("test"),
		// 				(err) => console.log(err)
		// 			);
		// 	});
		// },
		async initFacebook() {
			window.fbAsyncInit = function() {
				window.FB.init({
					appId: process.env.VUE_APP_FB_APP_ID,
					cookie: true,
					xfbml: true,
					version: "v8.0"
				});
			};
		},
		async loadFacebookSDK(d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			await fjs.parentNode.insertBefore(js, fjs);
		}
	}
};
</script>
<style></style>
