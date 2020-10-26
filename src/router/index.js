import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import HomePage from "../views/Home/HomePage.vue";
import LoginPage from "../views/Login/LoginPage.vue";
import Ranking from "../views/Ranking/Ranking.vue";
import ReportPage from "../views/Report/ReportPage.vue";
import RoomPage from "../views/Room/RoomPage.vue";
import RoomCreator from "../views/RoomCreator/RoomCreator.vue";
import WaitingRoom from "../views/WaitingRoom/WaitingRoom.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomePage,
		meta: {
			requiresAuth: true
		}
	},
	{ path: "/login", name: "Login", component: LoginPage },
	{
		path: "/lobby",
		name: "Lobby",
		component: WaitingRoom,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/room",
		name: "Room",
		component: RoomPage,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/room/create",
		name: "RoomCreate",
		component: RoomCreator,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/summary",
		name: "Summary",
		component: ReportPage,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/ranking",
		name: "Ranking",
		component: Ranking,
		meta: {
			requiresAuth: true
		}
	}
];

const router = new VueRouter({
	mode: "history",
	routes
});

router.beforeEach((to, from, next) => {
	store.dispatch("restoreSession");
	const { user } = store.getters;
	if (to.matched.some((route) => route.meta.requiresAuth)) {
		!user ? next({ path: "/login" }) : next();
	}
	if (to.matched.some((route) => !route.meta.requiresAuth)) {
		user ? next({ name: "Home" }) : next();
	}
});

export default router;
