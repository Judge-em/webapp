<template
	><div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<div
			class="col-6 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
		>
			<h5 class="pb-2 grey">{{ $t("creator.InviteFriends") }}</h5>
			<h2>{{ roomConfig.code }}</h2>
		</div>
		<div
			class="col-12 d-flex justify-content-between flex-column flex-sm-row flex-wrap"
		>
			<el-button
				type="danger"
				icon="el-icon-circle-close"
				class="text-wrap my-2 font-weight-bold"
				@click="previousStep"
				>{{ $t("creator.Previous") }}</el-button
			>
			<el-button
				type="success"
				class="text-wrap my-2 mx-0 font-weight-bold"
				@click="nextStep"
				>{{ $t("creator.Lobby") }} <i class=" el-icon-right"></i
			></el-button>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		roomConfig: {
			required: true,
			type: Object
		}
	},
	data() {
		return {};
	},
	methods: {
		previousStep() {
			this.$emit("dispatchPreviousStep");
		},
		async nextStep() {
			this.$emit("dispatchNextStep");
		}
	}
};
</script>
