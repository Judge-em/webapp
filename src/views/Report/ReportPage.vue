<template>
	<div class="report-page">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<summaries-card></summaries-card>
			</div>
		</div>
	</div>
</template>
<script>
import SummariesCard from "./content/SummariesCard.vue";
export default {
	components: {
		SummariesCard
	}
};
</script>
