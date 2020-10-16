import { ValidationProvider, ValidationObserver } from "vee-validate";

const globalComponents = {
	install(Vue) {
		Vue.component("ValidationProvider", ValidationProvider);
		Vue.component("ValidationObserver", ValidationObserver);
	}
};

export default globalComponents;
