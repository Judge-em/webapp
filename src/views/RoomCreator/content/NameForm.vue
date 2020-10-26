<template
	><div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<div
			class="col-6 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
		>
			<h5 class="pb-2 grey">{{ $t("creator.RoomName") }}</h5>
			<div class="col-12 col-lg-8 d-flex flex-column">
				<ValidationObserver ref="form">
					<div class="form-group">
						<ValidationProvider
							ref="roomName"
							name="RoomName"
							rules="required"
							v-slot="{ errors }"
						>
							<el-input
								:placeholder="$t('creator.RoomName')"
								v-model="roomConfig.name"
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
				</ValidationObserver>
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
		return {};
	},
	methods: {
		previousStep() {
			this.$emit("dispatchPreviousStep");
		},
		async nextStep() {
			const isValid = await this.$refs.form.validate();
			if (isValid && this.roomConfig.code.length > 0) {
				const result = await this.$game.createGame({
					name: this.roomConfig.name
				});
				console.log(result);
				this.$emit("dispatchNextStep");
			} else if (this.roomConfig.code.length > 0) {
				this.$emit("dispatchNextStep");
			}
		}
	}
};
</script>
