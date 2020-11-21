<template>
	<el-card class="box-card">
		<div slot="header" class="text-center ranking-header my-4">
			<h3>
				{{ $t("room.Ranking").toUpperCase() }}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap px-0 px-sm-3"
		>
			<div
				v-for="(item, index) in ranking"
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
					@click="leaveRoom"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.LeaveRoom") }}</el-button
				>
				<el-button
					type="success"
					icon="el-icon-right"
					@click="showSummary"
					class="text-wrap my-2 font-weight-bold"
					>{{ $t("lobby.ShowSummary") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
export default {
	data() {
		return {
			ranking: []
		};
	},
	async created() {
		const { data } = await this.$summary.getSummary(12);
		if (data) {
			const parsedData = JSON.parse(data.result);
			parsedData.Items.forEach((item) => {
				let totalScore = 0;
				item.Ratings.forEach((rating) => {
					totalScore += rating.TotalScore;
				});
				this.ranking.push({
					rating: totalScore / item.Ratings.length,
					name: item.name
				});
			});

			this.ranking.sort((a, b) => a.rating - b.rating);
		}
	},
	methods: {
		leaveRoom() {
			this.$router.push({ name: "Home" });
		},
		showSummary() {
			this.$router.push({ name: "Summary" });
		}
	}
};
</script>
<style></style>
