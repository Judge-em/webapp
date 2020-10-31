<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<div
			class="col-12 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
		>
			<h5 class="pb-2 grey">{{ $t("creator.EnterCategories") }}</h5>
			<div class="col-12 d-flex flex-column">
				<ValidationObserver ref="form">
					<div class="form-group">
						<div
							v-for="(category, index) in roomConfig.categories"
							:key="category.id"
							class="d-flex flex-wrap align-items-center justify-content-center my-2"
						>
							<div class="col-12 col-md-4 my-1 my-md-0">
								<ValidationProvider
									ref="categoryName"
									name="CategoryName"
									rules="required"
									v-slot="{ errors }"
								>
									<el-input
										:placeholder="
											$t('creator.CategoryName')
										"
										v-model="category.name"
										clearable
										:class="[{ 'is-invalid': errors[0] }]"
									>
										<i
											slot="prefix"
											class="el-input__icon el-icon-star-on"
										></i>
									</el-input>
									<small class="error-text">
										{{ errors[0] }}
									</small>
								</ValidationProvider>
							</div>
							<div class="col-12 col-md-2 my-1 my-md-0">
								<ValidationProvider
									ref="categoryWeight"
									name="CategoryWeight"
									rules="numeric|required"
									v-slot="{ errors }"
								>
									<el-input
										type="number"
										:placeholder="
											$t('creator.CategoryWeight')
										"
										v-model="category.weight"
										min="1"
										clearable
									>
										<i
											slot="prefix"
											class="el-input__icon fa fa-balance-scale"
										></i>
									</el-input>
									<small class="error-text">
										{{ errors[0] }}
									</small>
								</ValidationProvider>
							</div>
							<div class="col-12 col-md-2">
								<el-button
									type="danger"
									@click="removeCategory(index)"
									icon="el-icon-minus"
								></el-button>
							</div>
						</div>
					</div>
				</ValidationObserver>
			</div>
			<div
				class="col-12 d-flex justify-content-center align-items-center"
			>
				{{ $t("creator.NewCategory") }}
				<el-button
					@click="addNewCategory"
					class="ml-2"
					type="success"
					icon="el-icon-plus"
				></el-button>
			</div>
		</div>
		<div
			class="col-12 d-flex justify-content-between flex-column flex-sm-row flex-wrap"
		>
			<el-button
				type="danger"
				icon="el-icon-circle-close"
				class="text-wrap my-2 font-weight-bold"
				@click="previousStep"
				>{{ $t("creator.CancelRoom") }}</el-button
			>
			<el-button
				type="success"
				class="text-wrap my-2 mx-0 font-weight-bold"
				@click="nextStep"
				>{{ $t("creator.Next") }} <i class=" el-icon-right"></i
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
		return {
			oldCategories: [],
			test1: null,
			test2: null
		};
	},
	mounted() {
		this.fetchCategories();
	},
	computed: {
		newCategories() {
			return this.roomConfig.categories.filter((item) => item.new);
		},
		updatedCategories() {
			return this.oldCategories.filter((category) => {
				const item = this.roomConfig.categories.find(
					(item) => item.id === category.id
				);
				return !this.isCategoryEqual(item, category) && !category.new;
			});
		}
	},
	methods: {
		async fetchCategories() {
			const result = await this.$category.getCategories(
				this.roomConfig.id
			);
			if (result) {
				this.roomConfig.categories = [...result.data];
				this.oldCategories = this.roomConfig.categories.map((item) => ({
					...item
				}));
			}
		},
		async removeCategory(index) {
			if (this.roomConfig.categories[index].id) {
				await this.$category.removeCategory(
					this.roomConfig.categories[index].id
				);
			}
			this.roomConfig.categories.splice(index, 1);
		},
		addNewCategory() {
			this.roomConfig.categories.push({
				name: "",
				weight: 1,
				gameId: this.roomConfig.gameId,
				new: true
			});
		},
		previousStep() {
			this.$emit("dispatchPreviousStep");
		},
		async nextStep() {
			if (this.newCategories.length > 0) {
				await this.$category.createCategories(
					this.newCategories.map((item) => {
						item.weight = +item.weight;
						return item;
					})
				);
			}
			if (this.updatedCategories.length > 0) {
				await this.$category.updateCategories(
					this.updatedCategories.map((item) => {
						item.weight = +item.weight;
						return item;
					})
				);
			}
			// console.log(result);
			// if (result) {
			// 	this.$emit("dispatchNextStep");
			// }
		},
		isCategoryEqual(oldCategory, newCategory) {
			return (
				oldCategory.id === newCategory.id &&
				oldCategory.name === newCategory.name &&
				oldCategory.weight === newCategory.weight
			);
		}
	}
};
</script>
