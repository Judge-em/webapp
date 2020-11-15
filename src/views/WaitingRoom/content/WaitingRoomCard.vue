<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="text-center waiting-room-header my-4">
				<div>
					<h3>
						{{
							$t("lobby.WelcomeIn")
								.toUpperCase()
								.replace("|CODE|", code)
						}}
					</h3>
				</div>
				<div class="col-12 d-flex justify-content-end">
					<el-button
						type="success"
						icon="el-icon-notebook-2"
						class="text-wrap my-2 font-weight-bold"
						@click="itemsListDialog = true"
						>{{ $t("lobby.ItemsList") }}</el-button
					>
					<el-button
						type="success"
						icon="el-icon-circle-plus-outline"
						class="text-wrap my-2 font-weight-bold"
						@click="addItemDialog = true"
						>{{ $t("lobby.AddItem") }}</el-button
					>
				</div>
				<el-dialog
					:title="$t('lobby.ItemsList')"
					:visible.sync="itemsListDialog"
					:before-close="handleClose"
				>
					<span slot="footer" class="dialog-footer">
						<el-button @click="itemsListDialog = false"
							>Cancel</el-button
						>
						<el-button
							type="primary"
							@click="itemsListDialog = false"
							>Confirm</el-button
						>
					</span>
				</el-dialog>
				<el-dialog
					:title="$t('lobby.AddItem')"
					:visible.sync="addItemDialog"
					:before-close="handleClose"
				>
					<add-item :gameCode="code"></add-item>
				</el-dialog>
			</div>
			<div
				class="col-12 d-flex justify-content-center align-items-center flex-wrap px-0 px-sm-3"
			>
				<div
					v-for="(user, index) in usersInLobby"
					:key="index"
					class="col-6 col-sm-3 d-flex justify-content-center align-items-center my-3"
				>
					{{ user }}
				</div>

				<div class="col-12 d-flex justify-content-between">
					<el-button
						type="danger"
						icon="el-icon-back"
						@click="leaveRoom"
						class="text-wrap my-2 font-weight-bold"
						>{{ $t("lobby.LeaveRoom") }}</el-button
					>
					<el-button
						v-if="isMaster"
						type="success"
						icon="el-icon-right"
						@click="startGame()"
						class="text-wrap my-2 font-weight-bold"
						>{{ $t("lobby.Start") }}</el-button
					>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script>
import AddItem from "./AddItem.vue";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		AddItem
	},
	data() {
		return {
			code: "",
			itemsListDialog: false,
			addItemDialog: false
		};
	},
	mounted() {
		this.code = "UMIWAR";
		this.code = this.$route.params.roomCode;
	},
	methods: {
		...mapActions(["setGameConfig"]),
		addItem() {
			console.log("goToAdding");
		},
		leaveRoom() {
			this.$connection.invoke("DisconnectFromGame", this.code);
			this.$router.push({ name: "Home" });
		},
		startGame() {
			this.$connection.invoke("StartGame", this.code, this.items[0].id);
		},
		handleClose() {
			this.itemsListDialog = false;
			this.addItemDialog = false;
		}
	},
	computed: {
		...mapGetters(["isMaster", "items", "usersInLobby"])
	}
};
</script>
<style scoped></style>
