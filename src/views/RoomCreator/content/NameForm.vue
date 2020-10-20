<template>
	<div
		class="col-6 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
	>
		<h5 class="pb-2 grey">{{ $t("creator.RoomName") }}</h5>
		<div class="col-12 col-lg-8 d-flex flex-column">
			<el-input
				:placeholder="$t('creator.RoomName')"
				v-model="roomConfig.name"
				clearable
			>
				<i slot="prefix" class="el-input__icon el-icon-star-on"></i>
			</el-input>
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
	}
};
</script>
