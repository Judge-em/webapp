<template>
	<div class="home-page">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12 col-md-7"><room-card></room-card></div>
		</div>
	</div>
</template>
<script>
import RoomCard from "./content/RoomCard.vue";
export default {
	components: {
		RoomCard
	}
};
</script>
