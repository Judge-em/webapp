<template>
	<div class="d-flex">
		<navbar style="position:relative; z-index:2; height:100vh"></navbar>
		<div style="position:absolute; z-index:1" class="vw-100 vh-100">
			<router-view />asd
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
