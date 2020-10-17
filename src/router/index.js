import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/Home/HomePage.vue";
import LoginPage from "../views/Login/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", component: HomePage },
	{ path: "/login", name: "login", component: LoginPage }
];

const router = new VueRouter({
	mode: "history",
	routes
});

export default router;
