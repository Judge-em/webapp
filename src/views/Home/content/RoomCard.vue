<template>
	<el-card class="box-card">
		<div slot="header" class="text-center my-4">
			<h3 class="home-header">
				{{ $t("home.JoinToRoom").toUpperCase() }}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column px-0 px-sm-3"
		>
			<div class="col-12 col-lg-6 d-flex flex-column">
				<el-input
					:placeholder="$t('home.RoomCode')"
					v-model="roomCode"
					minlength="6"
					maxlength="6"
					clearable
				>
					<i slot="prefix" class="el-input__icon el-icon-key"></i>
				</el-input>
				<el-button
					type="primary"
					icon="el-icon-switch-button"
					@click="joinToRoom"
					class="text-wrap mt-3 font-weight-bold"
					>{{ $t("home.Join") }}</el-button
				>
			</div>
			<h5 class="my-2 grey">{{ $t("home.Or") }}</h5>
			<div class="col-12 col-lg-6 d-flex flex-column mb-2">
				<el-button
					type="success"
					icon="el-icon-magic-stick"
					@click="createRoom"
					class="text-wrap mb-4 mt-2 font-weight-bold"
					>{{ $t("home.CreateRoom") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			roomCode: ""
		};
	},
	methods: {
		async joinToRoom() {
			this.loading = true;
			const result = await this.$game.joinToRoom(this.roomCode);
			console.log(result);
			this.loading = false;
		},
		async createRoom() {
			this.$router.push({ name: "RoomCreate" });
		}
	}
};
</script>
<style></style>
