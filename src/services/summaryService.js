import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.summary = {
		async getSummaries(userId) {
			const result = await requestSender.send({
				method: "get",
				url: `/summaries/user/${userId}`
			});

			return result;
		},
		async getSummary(gameCode) {
			const result = await requestSender.send({
				method: "get",
				url: `/summaries/${gameCode}`
			});

			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$summary: {
			get: () => Vue.summary
		}
	});
}
