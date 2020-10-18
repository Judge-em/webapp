import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home/HomePage.vue";
import LoginPage from "../views/Login/LoginPage.vue";
import RoomCreator from "../views/RoomCreator/RoomCreator.vue";
import WaitingRoom from "../views/WaitingRoom/WaitingRoom.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", component: HomePage },
	{ path: "/login", name: "Login", component: LoginPage },
	{ path: "/lobby", name: "Lobby", component: WaitingRoom },

	{ path: "/room/create", name: "room/create", component: RoomCreator }
];

const router = new VueRouter({
	mode: "history",
	routes
});

export default router;
