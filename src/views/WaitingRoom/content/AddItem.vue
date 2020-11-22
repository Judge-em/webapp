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
					:disabled="loading"
					type="success"
					class="text-wrap mt-2 mx-0 font-weight-bold"
					@click="addNewItem()"
					>{{ $t("lobby.AddItem") }}
					<i class="el-icon-circle-plus-outline"></i
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
			loading: false,
			item: {
				name: "",
				description: "",
				imageLink: ""
			}
		};
	},
	methods: {
		async addNewItem() {
			this.loading = true;
			const isValid = await this.$refs.form.validate();
			if (isValid) {
				await this.$connection.invoke(
					"AddItem",
					this.item,
					this.gameCode
				);

				this.$notify.success({
					title: "Success",
					message: this.$t("lobby.ItemAdded")
				});
				this.item = {
					name: "",
					description: "",
					imageLink: ""
				};
				this.$refs.form.reset();
			}
			this.loading = false;
		}
	}
};
</script>
