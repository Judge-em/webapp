<template>
	<div class="d-flex">
		<navbar style="position:relative; z-index:2; height:100vh"></navbar>
		<div
			style="position:absolute; z-index:1; padding-left:64px"
			class="vw-100 vh-100"
		>
			<router-view />
		</div>
	</div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
export default {
	components: {
		Navbar
	}
};
</script>
