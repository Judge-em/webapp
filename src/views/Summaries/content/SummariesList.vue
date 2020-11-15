<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("summary.Summaries") }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-wrap"
		>
			<div class="d-flex flex-column">
				<div
					@click="openRanking(summary.gameId)"
					v-for="(summary, index) in summaries"
					:key="index"
				>
					{{ summary }}
				</div>
			</div>
		</div>
	</el-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			summaries: []
		};
	},
	async mounted() {
		const { data } = await this.$summary.getSummaries(this.user.nameid);
		this.summaries = data;
	},
	methods: {
		openRanking(id) {
			this.$router.push({ name: "Summary", params: { gameId: id } });
		}
	},
	computed: {
		...mapGetters(["user"])
	}
};
</script>
