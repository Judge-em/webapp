<template>
	<el-card class="box-card">
		<div slot="header" class="text-center ranking-header my-4">
			<h3>
				{{
					$t("ranking.Ranking")
						.toUpperCase()
						.replace("|CODE|", "23232")
				}}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap px-0 px-sm-3"
		>
			<div
				v-for="(item, index) in example"
				:key="index"
				class="col-12 d-flex justify-content-between align-items-center my-2 ranking-item py-2"
			>
				<span class="col-6">{{ item.name }}</span>
				<span
					class="col-6 d-flex justify-content-end align-items-center"
					>{{ item.rating }}
					<i v-if="index === 0" class="pl-2 el-icon-trophy"></i
				></span>
			</div>

			<div class="col-12 d-flex justify-content-between">
				<el-button
					type="danger"
					icon="el-icon-back"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.LeaveRoom") }}</el-button
				>
				<el-button
					type="success"
					icon="el-icon-right"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.Start") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			example: [
				{ name: "test1", rating: 10 },
				{ name: "test2", rating: 9 },
				{ name: "test3", rating: 8 },
				{ name: "test4", rating: 7 }
			]
		};
	},
	methods: {
		editRoom() {
			console.log("gotoEdit");
		},
		addItem() {
			console.log("goToAdding");
		}
	}
};
</script>
<style></style>
