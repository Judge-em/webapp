import Axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueAxios, Axios);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount("#app");
