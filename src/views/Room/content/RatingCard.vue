<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("room.Title") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<div class="d-flex flex-column">
				<el-image
					src="https://picsum.photos/600/100"
					fit="contain"
				></el-image>
				<span class="pt-3">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam ullamcorper, urna quis aliquet semper, dolor sapien
					accumsan tellus, quis pulvinar orci neque et nisi. Sed
					pellentesque id odio sit amet ultrices. Nulla laoreet
					sodales mi, id porttitor quam vehicula non. Phasellus vitae
					tempor tellus, sed porta odio.
				</span>
			</div>
			<div
				v-for="(n, index) in 10"
				:key="index"
				class="col-12 d-flex flex-column mb-3"
			>
				<el-divider content-position="left">Category Name</el-divider>
				<el-rate
					class="d-flex justify-content-between"
					v-model="value2"
					:colors="colors"
					:max="10"
				>
				</el-rate>
			</div>

			<div class="col-12 d-flex justify-content-end align-items-center">
				<span>{{
					`X ${$t("room.Players")} Y ${$t("room.Voted")}`
				}}</span>
				<el-button
					type="success"
					icon="el-icon-s-promotion"
					class="text-wrap my-2 ml-2"
					>Vote</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			input: "",
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
			value2: null
		};
	}
};
</script>
<style>
.el-rate__icon {
	font-size: 30px;
}
</style>
