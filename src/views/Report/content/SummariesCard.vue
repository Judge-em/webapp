<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("summary.Summary") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<canvas id="summaryChart"></canvas>
		</div>
		<el-button
			type="danger"
			icon="el-icon-s-home"
			@click="createRoom"
			class="text-wrap mb-4 mt-2 font-weight-bold"
			>{{ $t("home.GoHome") }}</el-button
		>
	</el-card>
</template>
<script>
import Chart from "chart.js";
export default {
	data() {
		return {
			summary: {},
			config: {
				type: "line",
				data: {
					labels: [],
					datasets: []
				},
				options: {
					scales: {
						yAxes: [
							{
								ticks: {
									max: 10,
									min: 0,
									beginAtZero: true
								}
							}
						],
						xAxes: [
							{
								offset: true
							}
						]
					}
				}
			}
		};
	},
	async mounted() {
		const { gameId } = this.$route.params;
		if (gameId) {
			const { data } = await this.$summary.getSummary(gameId);
			this.summary = JSON.parse(data.result);
			const profiles = [];
			this.summary.Items.forEach((item, index) => {
				for (const subItem of item.Ratings) {
					const profile = profiles.findIndex(
						(profile) => profile.id === subItem.PlayerProfile.Id
					);
					if (profile === -1) {
						const randomColor = this.getRandomColor();
						const profileIndex = profiles.push({
							id: subItem.PlayerProfile.Id,
							label: subItem.PlayerProfile.Nickname,
							data: [],
							showLine: false,
							pointBackgroundColor: randomColor,
							backgroundColor: randomColor,
							pointStyle: "rectRot",
							pointRadius: "10",
							pointHoverRadius: "12"
						});
						profiles[profileIndex - 1].data[index] =
							subItem.TotalScore;
					} else {
						profiles[profile].data[index] = subItem.TotalScore;
					}
				}
			});
			this.config.data.datasets = profiles;
			this.config.data.labels = this.summary.Items.map(
				(item) => item.Name
			);
			const ctx = document
				.getElementById("summaryChart")
				.getContext("2d");
			new Chart(ctx, this.config);
		} else this.$router.push({ name: "Home" });
	},
	methods: {
		getRandomColor() {
			const letters = "0123456789ABCDEF";
			let color = "#";
			for (let i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		}
	}
};
</script>
