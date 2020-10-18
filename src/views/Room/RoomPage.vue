<template>
	<div class="room">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<rating-card></rating-card>
			</div>
		</div>
	</div>
</template>
<script>
import RatingCard from "./content/RatingCard.vue";
export default {
	components: {
		RatingCard
	}
};
</script>
