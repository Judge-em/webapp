<template>
	<div class="room-creator">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<room-creator-card></room-creator-card>
			</div>
		</div>
	</div>
</template>
<script>
import RoomCreatorCard from "./content/RoomCreatorCard.vue";
export default {
	components: {
		RoomCreatorCard
	}
};
</script>
