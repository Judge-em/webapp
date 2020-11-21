<template>
	<el-card class="box-card" style="max-height:90vh; overflow:auto">
		<div slot="header" class="text-center">
			<h3>{{ item.name }}</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column px-0"
		>
			<div class="d-flex flex-column">
				<el-image
					v-if="item.imageLink"
					:src="item.imageLink"
					fit="contain"
					><div slot="error" class="image-slot">
						<i class="el-icon-picture-outline"></i></div
				></el-image>
				<span class="pt-3">
					{{ item.description }}
				</span>
			</div>
			<div
				v-for="(category, index) in categories"
				:key="category.id"
				class="col-12 d-flex flex-column mb-3"
			>
				<el-divider content-position="left">{{
					category.name
				}}</el-divider>
				<el-rate
					v-if="rating.categoryRatings[index]"
					class="d-flex justify-content-between flex-wrap h-100"
					v-model="rating.categoryRatings[index].score"
					:colors="colors"
					:max="10"
				>
				</el-rate>
			</div>

			<div
				class="col-12 d-flex justify-content-end align-items-center flex-column flex-md-row px-0"
			>
				<span v-if="votingProgress.max">{{
					`${$t("room.Voted")}:${votingProgress.progress}/${
						votingProgress.max
					} `
				}}</span>
				<el-button
					type="success"
					@click="vote()"
					icon="el-icon-s-promotion"
					class="text-wrap my-2 ml-2 col-12 col-md-2"
					>Vote</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import mediaQuery from "../../../mixins/mediaQuery";

export default {
	data() {
		return {
			item: {},
			currentId: "",
			input: "",
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
			rating: {
				playerProfileId: "",
				itemId: "",
				categoryRatings: [{ categoryId: 0, score: 0 }]
			}
		};
	},
	mounted() {
		this.currentId = this.lastGameConfig.lastItemId;
		this.rating.itemId = this.currentId;
		this.rating.playerProfileId = this.profileId;
		this.rating.categoryRatings = this.categories.map((item) => {
			return { categoryId: item.id, score: 0 };
		});
	},
	mixins: [mediaQuery],
	methods: {
		...mapActions(["setVotingProgress"]),
		vote() {
			let valid = true;
			for (const rating of this.rating.categoryRatings) {
				if (rating.score === 0) valid = false;
			}
			if (valid) {
				this.$connection.invoke(
					"AddRating",
					this.lastGameConfig.code,
					this.rating
				);
			} else {
				this.$notify.info({
					title: this.$t("room.MinRate")
				});
			}
		}
	},
	computed: {
		...mapGetters([
			"items",
			"categories",
			"profileId",
			"lastGameConfig",
			"votingProgress"
		])
	},
	watch: {
		currentId(newVal) {
			this.item = this.items.find((item) => item.id === newVal);
			this.setVotingProgress({ maxVotes: null, votingCounter: null });
		},
		lastGameConfig: {
			deep: true,
			handler(newVal) {
				console.log("changed");
				this.currentId = newVal.lastItemId;
				this.rating.itemId = this.currentId;
				this.rating.categoryRatings.forEach(
					(category) => (category.score = 0)
				);
			}
		}
	}
};
</script>
<style>
.el-rate__icon {
	font-size: 30px;
}
</style>
