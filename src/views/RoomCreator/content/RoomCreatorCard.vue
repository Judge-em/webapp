<template>
	<el-card class="box-card">
		<div slot="header" class="text-center my-4">
			<h3 class="room-creator-header">
				{{ $t("creator.RoomCreator").toUpperCase() }}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap px-0 px-sm-3"
		>
			<div class="col-12 pt-2 pb-4">
				<el-steps :active="active" finish-status="success">
					<el-step></el-step>
					<el-step></el-step>
					<el-step></el-step>
				</el-steps>
			</div>
			<component
				:is="currentComponent"
				:roomConfig="room"
				@dispatchPreviousStep="previousStep"
				@dispatchNextStep="nextStep"
			></component>
		</div>
	</el-card>
</template>
<script>
import { mapActions } from "vuex";
import NameForm from "./NameForm";
import CategoriesList from "./CategoriesList";
import InviteFriends from "./InviteFriends";

export default {
	data() {
		return {
			active: 0,
			room: {
				gameId: null,
				code: "",
				name: "",
				categories: [],
				items: []
			},
			dynamicComponents: [
				{ name: "name-form" },
				{ name: "categories-list" },
				{ name: "invite-friends" }
			]
		};
	},
	computed: {
		currentComponent() {
			return this.dynamicComponents[this.active].name;
		},
		isFirstStep() {
			return this.active === 0;
		},
		isLastStep() {
			return this.active === this.stepsLimit;
		},
		stepsLimit() {
			return this.dynamicComponents.length - 1;
		}
	},
	components: {
		NameForm,
		CategoriesList,
		InviteFriends
	},
	methods: {
		...mapActions(["setGameConfig"]),
		async nextStep(nickname) {
			if (this.active++ >= this.stepsLimit) {
				this.active = 0;

				if (!this.$connection.connectionStarted) {
					this.$notify.info({
						title: "Info",
						message: this.$t("layout.Wait")
					});
				}
				if (this.$connection.connectionStarted) {
					await this.$connection.invoke(
						"ConnectToGame",
						this.room.code,
						nickname
					);
					this.setGameConfig({
						code: this.room.code.toUpperCase(),
						nickname,
						lastItemId: null
					});
				}
			}
		},
		previousStep() {
			if (this.active-- <= 0) this.$router.push({ name: "Home" });
		}
	}
};
</script>
<style></style>
