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
		});
		connection.on("ShowSummary", (summary) => {
			gameHub.$emit("summary-received", summary);
		});
		connection.on("RefreshCategories", (category) => {
			gameHub.$emit("categories-received", category);
		});
		connection.on("SendPlayerProfileId", (profileId) => {
			gameHub.$emit("profile-received", profileId);
		});

		connection.on("RefreshPlayersList", (playerList) => {
			gameHub.$emit("player-list-received", playerList);
		});

		connection.on("AllowGameControl", (masterId) => {
			gameHub.$emit("master-id-received", masterId);
		});

		connection.on("RequestCurrentItemId", (gameCode) => {
			gameHub.$emit("master-requested", gameCode);
		});

		Vue.prototype.$connection = connection;
		let startedPromise = null;

		Vue.prototype.connect = () => {
			startedPromise = connection.start().catch(() => {
				return new Promise((resolve, reject) =>
					setTimeout(
						() =>
							Vue.prototype
								.connect()
								.then(resolve)
								.catch(reject),
						5000
					)
				);
			});
			return startedPromise;
		};
	}
};
