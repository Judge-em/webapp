<template>
	<div
		v-if="active === 2"
		class="col-12 d-flex flex-column justify-content-center align-items-center mb-5"
	>
		<h5 class="pb-2">{{ $t("creator.EnterCategories") }}</h5>
		<div class="col-12 d-flex flex-column">
			<div
				class="d-flex flex-wrap align-items-center justify-content-center"
			>
				<div class="col-12 col-sm-4">
					<el-input
						:placeholder="$t('creator.CategoryName')"
						v-model="input4"
						clearable
						class="mr-1"
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-4">
					<el-input
						:placeholder="$t('creator.CategoryWeight')"
						v-model="input5"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-3">
					<el-input
						:placeholder="$t('creator.CategoryWeight')"
						v-model="input6"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-1">
					<el-button type="success" icon="el-icon-plus"></el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			roomName: ""
		};
	}
};
</script>
