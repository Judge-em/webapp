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
import NameForm from "./NameForm";
import ItemsList from "./ItemsList";
import CategoriesList from "./CategoriesList";

export default {
	data() {
		return {
			active: 1,
			room: {
				code: "AKGKWF",
				name: "",
				categories: [
					{ name: "tete", weight: 3 },
					{ name: "tetae", weight: 4 }
				],
				items: [
					{
						name: "test",
						description: "asdas",
						image: "https://picsum.photos/600/100"
					},
					{
						name: "test",
						description: "asdas",
						image: "https://picsum.photos/600/100"
					}
				]
			},
			dynamicComponents: [
				{ name: "name-form" },
				{ name: "categories-list" },
				{ name: "items-list" }
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
		ItemsList,
		CategoriesList
	},
	methods: {
		nextStep() {
			if (this.active++ >= this.stepsLimit) {
				this.active = 0;
				this.createRoom();
			}
		},
		previousStep() {
			if (this.active-- <= 0) this.$router.push({ name: "Home" });
		},
		async createRoom() {
			// const result = await this.$game
			// this.$router.push({
			// 	name: "Lobby",
			// 	params: { roomCode: this.room.code }
			// });
		}
	}
};
</script>
<style></style>
