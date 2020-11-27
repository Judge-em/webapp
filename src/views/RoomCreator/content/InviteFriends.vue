<template
	><div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<div
			class="col-6 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
		>
			<h5 class="pb-2 grey">{{ $t("creator.InviteFriends") }}</h5>
			<el-tooltip placement="top">
				<div slot="content">
					{{ $t("creator.CopyToClipboard") }}
				</div>
				<h2 @click="copy()" class="clipboard-code">
					{{ roomConfig.code }} <i class="el-icon-document-copy"></i>
					<input
						type="hidden"
						id="game-code"
						:value="roomConfig.code"
					/>
				</h2>
			</el-tooltip>
			<ValidationObserver ref="form" class="pt-3">
				<div class="form-group">
					<ValidationProvider
						ref="nickname"
						name="Nickname"
						rules="required|max:25"
						v-slot="{ errors }"
					>
						<el-input
							:placeholder="$t('home.Nickname')"
							v-model="nickname"
							clearable
							:class="[{ 'is-invalid': errors[0] }]"
						>
							<i
								slot="prefix"
								class="el-input__icon el-icon-user-solid"
							></i>
						</el-input>
						<small class="error-text">
							{{ errors[0] }}
						</small>
					</ValidationProvider>
				</div>
			</ValidationObserver>
		</div>
		<div
			class="col-12 d-flex justify-content-between flex-column flex-sm-row flex-wrap"
		>
			<el-button
				type="danger"
				icon="el-icon-back"
				class="text-wrap my-2 font-weight-bold"
				@click="previousStep"
				>{{ $t("creator.Previous") }}</el-button
			>
			<el-button
				type="success"
				class="text-wrap my-2 mx-0 font-weight-bold"
				@click="nextStep"
				>{{ $t("creator.Lobby") }} <i class="el-icon-right"></i
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
			nickname: ""
		};
	},
	methods: {
		previousStep() {
			this.$emit("dispatchPreviousStep");
		},
		async nextStep() {
			const isValid = await this.$refs.form.validate();
			if (isValid) this.$emit("dispatchNextStep", this.nickname);
		},
		copy() {
			const codeToCopy = document.querySelector("#game-code");
			codeToCopy.setAttribute("type", "text");
			codeToCopy.select();
			const successful = document.execCommand("copy");
			if (successful) {
				this.$notify.success({ title: this.$t("creator.Copied") });
			} else
				this.$notify.error({
					title: this.$t("creator.SomethingGoesWrong")
				});

			codeToCopy.setAttribute("type", "hidden");
			window.getSelection().removeAllRanges();
		}
	}
};
</script>
