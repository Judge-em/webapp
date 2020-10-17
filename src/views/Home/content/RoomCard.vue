<template>
	<el-card class="box-card">
		<div slot="header" class="text-center">
			<h3>{{ $t("home.JoinToRoom") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column"
		>
			<label>{{ $t("home.RoomCodeInput") }} </label>
			<div class="col-12 col-lg-6 d-flex flex-column">
				<el-input
					:placeholder="$t('home.RoomCode')"
					v-model="input"
					clearable
				>
					<i slot="prefix" class="el-input__icon el-icon-key"></i>
				</el-input>
				<el-button
					type="primary"
					icon="el-icon-switch-button"
					class="text-wrap mt-3"
					>Join</el-button
				>
			</div>
			<h4 class="my-3">{{ $t("home.CreateRoom") }}</h4>
			<div class="col-12 col-lg-6 d-flex flex-column">
				<el-button
					type="info"
					icon="el-icon-magic-stick"
					class="text-wrap my-2"
					>Create room</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			input: ""
		};
	}
};
</script>
<style></style>
