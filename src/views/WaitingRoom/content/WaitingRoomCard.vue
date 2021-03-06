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
					:fullscreen="isSmallScreen"
					:before-close="handleClose"
				>
					<items-list></items-list>
				</el-dialog>
				<el-dialog
					:title="$t('lobby.AddItem')"
					:visible.sync="addItemDialog"
					:fullscreen="isSmallScreen"
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
import ItemsList from "./ItemsList.vue";
import AddItem from "./AddItem.vue";
import { mapGetters, mapActions } from "vuex";
import mediaQuery from "../../../mixins/mediaQuery";

export default {
	components: {
		AddItem,
		ItemsList
	},
	mixins: [mediaQuery],
	data() {
		return {
			code: "",
			itemsListDialog: false,
			addItemDialog: false
		};
	},
	mounted() {
		const { roomCode } = this.$route.params;
		if (roomCode) this.code = roomCode.toUpperCase();
		else this.$router.push({ name: "Home" });
	},
	methods: {
		...mapActions(["setGameConfig"]),
		leaveRoom() {
			this.$connection.invoke("DisconnectFromGame", this.code);
			this.$router.push({ name: "Home" });
		},
		startGame() {
			if (this.items.length > 0)
				this.$connection.invoke(
					"StartGame",
					this.code,
					this.items[0].id
				);
			else {
				this.$notify.info({
					title: "Info",
					message: this.$t("layout.NoItems")
				});
			}
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
