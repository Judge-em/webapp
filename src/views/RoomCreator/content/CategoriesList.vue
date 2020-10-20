<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center mb-5"
	>
		<h5 class="pb-2 grey">{{ $t("creator.EnterCategories") }}</h5>
		<div class="col-12 d-flex flex-column">
			<div
				v-for="(category, index) in roomConfig.categories"
				:key="index"
				class="d-flex flex-wrap align-items-center justify-content-center"
			>
				<div class="col-12 col-sm-4">
					<el-input
						:placeholder="$t('creator.CategoryName')"
						v-model="input2"
						clearable
						class="mr-1"
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-2">
					<el-input
						:placeholder="$t('creator.CategoryWeight')"
						v-model="input3"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-2">
					<el-button type="success" icon="el-icon-plus"></el-button>
				</div>
			</div>
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
