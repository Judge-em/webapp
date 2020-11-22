import requestSender from "../helpers/requestSender";
import store from "../store";

export default function(Vue) {
	Vue.auth = {
		async logIn(provider, accessToken) {
			const result = await requestSender.send(
				{
					method: "post",
					url: `/login/${provider}`
				},
				accessToken !== null ? { token: accessToken } : ""
			);
			store.dispatch("setSession", result.data.token);
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => Vue.auth
		}
	});
}
