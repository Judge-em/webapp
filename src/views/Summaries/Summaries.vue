<template>
	<div class="room">
		<div
			class="container vh-100 d-flex align-items-center justify-content-center"
		>
			<div class="col-12">
				<summaries-list></summaries-list>
			</div>
		</div>
	</div>
</template>
<script>
import SummariesList from "./content/SummariesList.vue";
export default {
	components: {
		SummariesList
	}
};
</script>
