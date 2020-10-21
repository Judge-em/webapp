<template
	><div>
		<el-menu
			default-active="2"
			class="vh-100"
			@open="handleOpen"
			text-color=""
			@close="handleClose"
			:collapse="isCollapse"
			:style="navbarStyle"
		>
			<el-menu-item
				@click="isCollapse = !isCollapse"
				:style="navbarItemStyle"
			>
				<i v-if="isCollapse" class="el-icon-s-unfold"></i>
				<i v-else class="el-icon-s-fold"></i
			></el-menu-item>
			<el-menu-item index="1">
				<i class="el-icon-notebook-2"></i>
				<span slot="title">{{ $t("layout.Summaries") }}</span>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="el-icon-switch-button"></i>
				<span slot="title">{{ $t("layout.LogOut") }}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
import mediaQuery from "../mixins/mediaQuery";
export default {
	data() {
		return {
			isCollapse: true
		};
	},
	mixins: [mediaQuery],
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	},
	computed: {
		navbarStyle() {
			if (this.isSmallScreen && this.isCollapse) {
				return "margin-left: -65px; padding-left: 20px ";
			}
			return "";
		},
		navbarItemStyle() {
			if (this.isSmallScreen && this.isCollapse) {
				return "margin-left: 45px; padding-right: 40px ";
			}
			return "";
		}
	}
};
</script>
