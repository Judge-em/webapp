<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ $t("summary.Summaries") }}</h3>
		</div>
		<el-table
			:data="summaries"
			style="width: 100%"
			:empty-text="$t('creator.EmptyList')"
		>
			<el-table-column prop="gameName" :label="$t('summary.Summary')">
			</el-table-column>
			<el-table-column prop="finishedAt" :label="$t('summary.Date')">
			</el-table-column>
			<el-table-column align="right">
				<template slot-scope="scope">
					<div class="col-12 col-md-2">
						<el-button
							type="success"
							@click="openRanking(scope.row.gameId)"
							icon="el-icon-right"
						></el-button></div
				></template>
			</el-table-column>
		</el-table>
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
