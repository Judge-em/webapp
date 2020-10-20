export default {
	data() {
		return {
			width: window.innerWidth,
			breakpoint: 600
		};
	},
	methods: {
		updateWidth() {
			this.width = window.innerWidth;
		}
	},
	computed: {
		isSmallScreen() {
			return this.width < this.breakpoint;
		}
	},
	created() {
		window.addEventListener("resize", this.updateWidth);
	},
	destroyed() {
		window.removeEventListener("resize", this.updateWidth);
	}
};
