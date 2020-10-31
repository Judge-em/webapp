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
			console.log(itemId);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("RefreshItemList", (items, messsage) => {
			console.log(items, messsage);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("RefreshVotingProgress", (voteCounter, maxVotes) => {
			console.log(voteCounter, maxVotes);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("SendMessage", (messsage) => {
			console.log(messsage);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("DisbandGame", (messsage) => {
			console.log(messsage);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("ShowSummary", (summary) => {
			console.log(summary);
			// gameHub.$emit("user-added-event", { userId, userName });
		});
		connection.on("SendPlayerProfileId", (profileId) => {
			console.log(profileId);
			// gameHub.$emit("user-added-event", { userId, userName });
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
