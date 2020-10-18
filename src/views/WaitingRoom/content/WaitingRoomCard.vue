<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("lobby.WelcomeIn") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<div
				v-for="(n, index) in 80"
				:key="index"
				class="col-3 d-flex justify-content-center align-items-center my-3"
			>
				Nickname
			</div>

			<div class="col-12 d-flex justify-content-between">
				<el-button
					type="danger"
					icon="el-icon-back"
					class="text-wrap my-2"
					>Leave room</el-button
				>
				<el-button
					type="success"
					icon="el-icon-right"
					class="text-wrap my-2"
					>Start game</el-button
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
