<template>
	<el-card class="box-card">
		<div slot="header" class="text-center">
			<h3>{{ $t("creator.RoomCreate") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<div class="col-12">
				<el-steps :active="active" finish-status="success">
					<el-step title="Step 1"></el-step>
					<el-step title="Step 2"></el-step>
					<el-step title="Step 3"></el-step>
				</el-steps>

				<el-button style="margin-top: 12px;" @click="next"
					>Next step</el-button
				>
			</div>
			<div
				v-if="active === 0"
				class="col-6 d-flex flex-column justify-content-center align-items-center mb-5"
			>
				<h5 class="pb-2">{{ $t("creator.RoomCodeInput") }}</h5>
				<div class="col-12 col-lg-6 d-flex flex-column">
					<el-input
						:placeholder="$t('creator.RoomName')"
						v-model="input"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
			</div>
			<div
				v-if="active === 1"
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
								v-model="input2"
								clearable
								class="mr-1"
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-key"
								></i>
							</el-input>
						</div>
						<div class="col-12 col-sm-2">
							<el-input
								:placeholder="$t('creator.CategoryWeight')"
								v-model="input3"
								clearable
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-key"
								></i>
							</el-input>
						</div>
						<div class="col-12 col-sm-2">
							<el-button
								type="success"
								icon="el-icon-plus"
							></el-button>
						</div>
					</div>
				</div>
			</div>
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
								<i
									slot="prefix"
									class="el-input__icon el-icon-key"
								></i>
							</el-input>
						</div>
						<div class="col-12 col-sm-4">
							<el-input
								:placeholder="$t('creator.CategoryWeight')"
								v-model="input5"
								clearable
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-key"
								></i>
							</el-input>
						</div>
						<div class="col-12 col-sm-3">
							<el-input
								:placeholder="$t('creator.CategoryWeight')"
								v-model="input6"
								clearable
							>
								<i
									slot="prefix"
									class="el-input__icon el-icon-key"
								></i>
							</el-input>
						</div>
						<div class="col-12 col-sm-1">
							<el-button
								type="success"
								icon="el-icon-plus"
							></el-button>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 d-flex justify-content-between flex-wrap">
				<el-button
					type="danger"
					icon="el-icon-back"
					class="text-wrap my-2"
					>Cancel room</el-button
				>
				<el-button
					type="success"
					icon="el-icon-right"
					class="text-wrap my-2 "
					>Create Room</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			active: 2,
			input: "",
			input2: "",
			input3: "",
			input4: "",
			input5: ""
		};
	},
	methods: {
		next() {
			if (this.active++ > 2) this.active = 0;
		}
	}
};
</script>
<style></style>
