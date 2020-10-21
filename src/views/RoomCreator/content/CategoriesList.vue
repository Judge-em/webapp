<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
	>
		<h5 class="pb-2 grey">{{ $t("creator.EnterCategories") }}</h5>
		<div class="col-12 d-flex flex-column">
			<div
				v-for="(category, index) in roomConfig.categories"
				:key="index"
				class="d-flex flex-wrap align-items-center justify-content-center my-2"
			>
				<div class="col-12 col-sm-4">
					<el-input
						:placeholder="$t('creator.CategoryName')"
						v-model="category.name"
						clearable
						class="mr-1"
					>
						<i
							slot="prefix"
							class="el-input__icon el-icon-star-on"
						></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-2">
					<el-input
						type="number"
						:placeholder="$t('creator.CategoryWeight')"
						v-model="category.weight"
						clearable
					>
						<i
							slot="prefix"
							class="el-input__icon fa fa-balance-scale"
						></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-2">
					<el-button
						type="danger"
						@click="removeCategory(index)"
						icon="el-icon-minus"
					></el-button>
					<el-button
						v-if="index === roomConfig.categories.length - 1"
						@click="addNewCategory"
						type="success"
						icon="el-icon-plus"
					></el-button>
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
	},
	methods: {
		removeCategory(index) {
			this.roomConfig.categories.splice(index, 1);
		},
		addNewCategory() {
			this.roomConfig.categories.push({ name: "", weight: "" });
		}
	}
};
</script>
