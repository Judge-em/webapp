<template>
	<el-card class="box-card">
		<div slot="header" class="text-center">
			<h3>{{ $t("login.Login") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column"
		>
			<span>{{ $t("login.LoginToOurApp") }} </span>
			<div class="col-12 col-lg-6 d-flex flex-column">
				<el-button
					type="primary"
					icon="fa fa-facebook fa-fw"
					class="text-wrap mt-4"
					>Login with Facebook</el-button
				>
				<el-button
					type="danger"
					icon="fa fa-google fa-fw"
					class="ml-0 mt-2 text-wrap"
					>Login with Google+</el-button
				>
			</div>
			<span class="my-3">{{ $t("login.LoginAsGuest") }} </span>
			<div class="col-12 col-lg-6 d-flex flex-column">
				<el-button
					type="info"
					icon="fa fa-facebook fa-fw"
					class="text-wrap my-2"
					>Login as Guest</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {};
</script>
<style></style>
