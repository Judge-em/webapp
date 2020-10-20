<template>
	<div class="d-flex vh-100">
		<navbar v-if="showNavbar" class="navbar-overlay"></navbar>
		<div
			:style="{ paddingLeft: showNavbar && !isSmallScreen ? '64px' : '' }"
			class=" view-overlay vw-100 vh-100"
		>
			<router-view />
		</div>
	</div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import mediaQuery from "./mixins/mediaQuery";
export default {
	components: {
		Navbar
	},
	data() {
		return {
			routesWithoutMenu: ["Login"]
		};
	},
	mixins: [mediaQuery],
	computed: {
		showNavbar() {
			// return true;
			return !this.routesWithoutMenu.includes(this.$route.name);
		}
	}
};
</script>
