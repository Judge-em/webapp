import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import i18n from "./locales/i18n";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueAxios, Axios);
Vue.use(VueCookies);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App)
}).$mount("#app");
