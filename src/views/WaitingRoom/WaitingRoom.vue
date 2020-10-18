<template>
	<div class="waiting-room">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<waiting-room-card></waiting-room-card>
			</div>
		</div>
	</div>
</template>
<script>
import WaitingRoomCard from "./content/WaitingRoomCard.vue";
export default {
	components: {
		WaitingRoomCard
	}
};
</script>
