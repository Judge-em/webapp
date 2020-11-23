<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center"
	>
		<el-table
			:data="items"
			style="width: 100%"
			:empty-text="$t('creator.EmptyList')"
		>
			<el-table-column prop="name" :label="$t('creator.ItemName')">
			</el-table-column>
			<el-table-column
				prop="description"
				:label="$t('creator.ItemDescription')"
			>
			</el-table-column>
			<el-table-column prop="imageLink" :label="$t('creator.ItemImage')">
			</el-table-column>
			<el-table-column v-if="isMaster">
				<template slot-scope="scope">
					<div class="col-12 col-md-2">
						<el-button
							type="danger"
							@click="removeItem(scope.row)"
							icon="el-icon-minus"
						></el-button></div
				></template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			loading: false
		};
	},
	methods: {
		async removeItem(item) {
			await this.$connection.invoke(
				"RemoveItem",
				item.id,
				this.lastGameConfig.code
			);
		}
	},
	computed: {
		...mapGetters(["items", "isMaster", "lastGameConfig"])
	}
};
</script>
