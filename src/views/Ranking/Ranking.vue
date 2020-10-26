<template>
	<div class="ranking-page">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<ranking-card></ranking-card>
			</div>
		</div>
	</div>
</template>
<script>
import RankingCard from "./content/RankingCard.vue";
export default {
	components: {
		RankingCard
	}
};
</script>
