import requestSender from "../helpers/requestSender";
import store from "../store";

export default function(Vue) {
	Vue.auth = {
		async loginUser(username, password) {
			const credentials = {
				username,
				password
			};

			const loginResult = await requestSender.send(
				{
					method: "post",
					url: "/auth/login"
				},
				credentials
			);

			if (loginResult.status) {
				store.dispatch("setSession", loginResult.data.access_token);
			}
			return loginResult;
		},
		async logoutUser(refreshToken) {
			const logoutResult = await requestSender.send(
				{
					method: "post",
					url: "/auth/logout"
				},
				{
					refreshToken
				}
			);

			return logoutResult;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$auth: {
			get: () => Vue.auth
		}
	});
}
