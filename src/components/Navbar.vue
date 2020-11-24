<template
	><div>
		<el-menu class="vh-100" :collapse="isCollapse" :style="navbarStyle">
			<el-menu-item
				@click="isCollapse = !isCollapse"
				:style="navbarItemStyle"
			>
				<i v-if="isCollapse" class="el-icon-s-unfold"></i>
				<i v-else class="el-icon-s-fold"></i
			></el-menu-item>
			<el-menu-item @click="$router.push({ name: 'Home' })">
				<i class="el-icon-s-home"></i>
				<span slot="title">{{ $t("layout.Home") }}</span>
			</el-menu-item>
			<el-menu-item
				v-if="!isGuest"
				@click="$router.push({ name: 'Summaries' })"
			>
				<i class="el-icon-notebook-2"></i>
				<span slot="title">{{ $t("layout.Summaries") }}</span>
			</el-menu-item>
			<el-menu-item @click="destroySession">
				<i class="el-icon-switch-button"></i>
				<span slot="title">{{ $t("layout.LogOut") }}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
import mediaQuery from "../mixins/mediaQuery";
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return {
			isCollapse: true
		};
	},
	mixins: [mediaQuery],
	methods: {
		...mapActions(["destroySession"])
	},
	computed: {
		...mapGetters(["isGuest"]),
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
