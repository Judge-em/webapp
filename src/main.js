import gameHub from "@/plugins/gameHub";
import globalComponents from "@/plugins/globalComponents";
import globalStyles from "@/plugins/globalStyles";
import "@/plugins/veeValidate";
import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import cookieHelper from "./helpers/cookieHelper";
import i18n from "./locales/i18n";
import router from "./router";
import authService from "./services/authorizationService";
import categoryService from "./services/categoryService";
import gameService from "./services/gameService";
import itemService from "./services/itemService";
import summaryService from "./services/summaryService";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueAxios, Axios);
Vue.use(VueCookies);
Vue.use(globalStyles);
Vue.use(globalComponents);
Vue.use(authService);
Vue.use(itemService);
Vue.use(gameService);
Vue.use(summaryService);
Vue.use(categoryService);
Vue.use(gameHub);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

Vue.axios.interceptors.request.use(
	(config) => {
		const token = cookieHelper.getSessionCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

Vue.axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		let errorResponse = error.response;
		if (!errorResponse) {
			router.push({
				name: "Login"
			});
			errorResponse = {
				data: {
					success: false,
					message: "Connection error"
				}
			};
		} else if (error.response.status === 500) {
			this.$notify.error({
				title: "Error",
				message: error.response.data.message
			});
		} else if (
			error.response.status === 401 ||
			error.response.status === 403 // TODO: Consider this
		) {
			store.dispatch("deleteSession");
		}
		return Promise.reject(errorResponse);
	}
);

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount("#app");
