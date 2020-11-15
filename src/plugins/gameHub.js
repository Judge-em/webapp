import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import cookieHelper from "../helpers/cookieHelper";
export default {
	install(Vue) {
		const connection = new HubConnectionBuilder()
			.withUrl(`https://judge-em-api.herokuapp.com/hubs/game`, {
				accessTokenFactory: () => cookieHelper.getSessionCookie()
			})
			.configureLogging(LogLevel.Information)
			.build();

		const gameHub = new Vue();

		Vue.prototype.$gameHub = gameHub;

		connection.on("RefreshCurrentItemId", (itemId) => {
			gameHub.$emit("current-item-received", itemId);
		});
		connection.on("RefreshItemList", (items) => {
			gameHub.$emit("items-received", items);
		});
		connection.on("RefreshVotingProgress", (voteCounter, maxVotes) => {
			gameHub.$emit("voting-progress-received", voteCounter, maxVotes);
		});
		connection.on("SendMessage", (content, type) => {
			gameHub.$emit("message-received", { content, type });
		});
		connection.on("DisbandGame", (messsage) => {
			console.log(messsage);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("ShowSummary", (summary) => {
			console.log(summary);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("RefreshCategories", (category) => {
			gameHub.$emit("categories-received", category);
		});
		connection.on("SendPlayerProfileId", (profileId) => {
			gameHub.$emit("profile-received", profileId);
		});

		connection.on("RefreshPlayersList", (playerList) => {
			console.log(playerList);
			gameHub.$emit("player-list-received", playerList);
		});

		connection.on("AllowGameControl", (masterId) => {
			console.log(masterId);
			gameHub.$emit("master-id-received", masterId);
		});

		connection.on("RequestCurrentItemId", (gameCode) => {
			gameHub.$emit("master-requested", gameCode);
		});

		Vue.prototype.$connection = connection;
		// if connection closed, reopen it
		let startedPromise = null;
		function start() {
			startedPromise = connection.start().catch((err) => {
				console.log(err);
				return new Promise((resolve, reject) =>
					setTimeout(
						() =>
							start()
								.then(resolve)
								.catch(reject),
						5000
					)
				);
			});
			return startedPromise;
		}

		connection.onclose(() => start());
		start();
	}
};
