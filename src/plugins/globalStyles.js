import "../assets/sass/imports.scss";
import globalComponents from "./globalComponents";

export default {
	install(Vue) {
		Vue.use(globalComponents);
	}
};
