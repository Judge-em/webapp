<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<div
			class="col-12 d-flex flex-column justify-content-center align-items-center my-3 mb-4 px-0"
		>
			<ValidationObserver ref="form">
				<div
					class="form-group d-flex flex-column flex-md-row flex-wrap"
				>
					<div class="col-12 col-md-6 my-1 my-md-0 px-0 px-md-1">
						<ValidationProvider
							ref="itemName"
							name="ItemName"
							rules="required"
							v-slot="{ errors }"
						>
							<el-input
								:placeholder="$t('creator.ItemName')"
								v-model="item.name"
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
					<div class="col-12 col-md-6 my-1 my-md-0 px-0 px-md-1">
						<ValidationProvider
							ref="itemImage"
							name="ItemImage"
							rules="required"
							v-slot="{ errors }"
						>
							<el-input
								:placeholder="$t('creator.ItemImage')"
								v-model="item.imageLink"
								clearable
								:class="[{ 'is-invalid': errors[0] }]"
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
					<div class="col-12 my-2 px-0 px-md-1">
						<ValidationProvider
							ref="itemDescription"
							name="ItemDescription"
							rules="required"
							v-slot="{ errors }"
						>
							<el-input
								:placeholder="$t('creator.ItemDescription')"
								v-model="item.description"
								clearable
								:class="[{ 'is-invalid': errors[0] }]"
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
				</div>
			</ValidationObserver>
			<div
				class="col-12 d-flex justify-content-end flex-column flex-sm-row flex-wrap"
			>
				<el-button
					type="danger"
					class="text-wrap mt-2 mx-2 font-weight-bold"
					@click="nextStep"
					>{{ $t("creator.Delete") }} <i class="el-icon-right"></i
				></el-button>
				<el-button
					type="success"
					class="text-wrap mt-2 mx-0 font-weight-bold"
					@click="addNewItem()"
					>{{ $t("creator.Next") }} <i class="el-icon-right"></i
				></el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		gameCode: { type: String, required: true }
	},
	data() {
		return {
			item: {
				name: "",
				description: "",
				imageLink: ""
			}
		};
	},
	methods: {
		removeItem(index) {
			this.roomConfig.items.splice(index, 1);
		},
		async addNewItem() {
			const isValid = await this.$refs.form.validate();
			if (isValid) {
				const result = await this.$connection.invoke(
					"AddItem",
					this.item,
					this.gameCode
				);
				console.log(result);
			}
		},
		previousStep() {
			this.$emit("dispatchPreviousStep");
		},
		nextStep() {
			this.$emit("dispatchNextStep");
		}
	}
};
</script>
