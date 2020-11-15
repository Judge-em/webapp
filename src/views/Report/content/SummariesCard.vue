<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("summary.Summary") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<canvas id="testChart"></canvas>
		</div>
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
		// const { gameId } = this.$route.params;
		const { data } = await this.$summary.getSummary(12);
		this.summary = JSON.parse(data.result);
		const profiles = [];
		this.summary.Items.forEach((item, index) => {
			for (const subItem of item.Ratings) {
				const test = profiles.findIndex(
					(profile) => profile.id === subItem.PlayerProfile.Id
				);
				if (test === -1) {
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
					console.log(profileIndex);
					profiles[profileIndex - 1].data[index] = subItem.TotalScore;
				} else {
					profiles[test].data[index] = subItem.TotalScore;
				}
			}
		});
		console.log(profiles);
		this.config.data.datasets = profiles;
		this.config.data.labels = this.summary.Items.map((item) => item.Name);
		const ctx = document.getElementById("testChart").getContext("2d");
		const chart = new Chart(ctx, this.config);
		console.log(chart);
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
