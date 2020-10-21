<template>
	<el-card class="box-card">
		<div slot="header" class="text-center waiting-room-header my-4">
			<div>
				<h3>
					{{
						$t("lobby.WelcomeIn")
							.toUpperCase()
							.replace("|CODE|", "23232")
					}}
				</h3>
			</div>
			<div class="col-12 d-flex justify-content-end">
				<el-button
					type="success"
					icon="el-icon-edit"
					class="text-wrap my-2 font-weight-bold"
					@click="editRoom"
					>{{ $t("lobby.EditRoom") }}</el-button
				>
				<el-button
					type="success"
					icon="el-icon-circle-plus-outline"
					class="text-wrap my-2 font-weight-bold"
					@click="addItem"
					>{{ $t("lobby.AddItem") }}</el-button
				>
			</div>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap px-0 px-sm-3"
		>
			<div
				v-for="(n, index) in 80"
				:key="index"
				class="col-6 col-sm-3 d-flex justify-content-center align-items-center my-3"
			>
				Nickname
			</div>

			<div class="col-12 d-flex justify-content-between">
				<el-button
					type="danger"
					icon="el-icon-back"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.LeaveRoom") }}</el-button
				>
				<el-button
					type="success"
					icon="el-icon-right"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.Start") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		editRoom() {
			console.log("gotoEdit");
		},
		addItem() {
			console.log("goToAdding");
		}
	}
};
</script>
<style></style>
