import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.auth = {
		async createGame(gameConfig) {
			const result = await requestSender.send(
				{
					method: "post",
					url: "/games"
				},
				gameConfig
			);

			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$game: {
			get: () => Vue.game
		}
	});
}
