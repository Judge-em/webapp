import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.game = {
		async createGame(gameTitle) {
			const result = await requestSender.send(
				{
					method: "post",
					url: "/games"
				},
				gameTitle
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
