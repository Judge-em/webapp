import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import localStorageHelper from "../helpers/localStorageHelper";
import parseJwt from "../helpers/parseJwt";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null,
		profileId: "",
		master: false,
		lastGameConfig: {
			code: "",
			nickname: "",
			lastItemId: null
		},
		categories: [],
		items: [],
		lobby: [],
		votingProgress: { max: null, progress: null }
	},
	getters: {
		user: (state) => state.user,
		isGuest: (state) => state.user.role === "Guest",
		profileId: (state) => state.profileId,
		lastGameConfig: (state) => state.lastGameConfig,
		isMaster: (state) => state.master,
		categories: (state) => state.categories,
		items: (state) => state.items,
		usersInLobby: (state) => state.lobby,
		votingProgress: (state) => state.votingProgress
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
		},
		storeProfileId(state, profileId) {
			state.profileId = profileId;
		},
		setGameConfig(state, config) {
			state.lastGameConfig = config;
		},
		setGameMaster(state, isMaster) {
			state.master = isMaster;
		},
		setCategorie(state, categories) {
			state.categories = categories;
		},
		setItems(state, items) {
			state.items = items;
		},
		setVotingProgress(state, votingProgress) {
			state.votingProgress.max = votingProgress.maxVotes;
			state.votingProgress.progress = votingProgress.votingCounter;
		},
		setLastItemId(state, itemId) {
			state.lastGameConfig.lastItemId = itemId;
		},
		setUsersInLobby(state, users) {
			state.lobby = users;
		},
		clearConfig(state) {
			state.profileId = "";
			state.master = false;
			state.lastGameConfig = {
				code: "",
				nickname: "",
				lastItemId: null
			};
			state.categories = [];
			state.items = [];
			state.lobby = [];
			state.votingProgress = { max: null, progress: null };
		}
	},
	actions: {
		setSession({ commit }, token) {
			commit("storeUser", parseJwt(token));
			cookieHelper.setSessionCookie(token);
		},
		restoreSession({ getters, dispatch }) {
			if (getters.user == null) {
				if (cookieHelper.hasSessionCookie()) {
					dispatch("setSession", cookieHelper.getSessionCookie());
					if (localStorageHelper.isStored("lastGame")) {
						dispatch(
							"setGameConfig",
							localStorageHelper.getFromStorage("lastGame")
						);
					}
				}
			}
		},
		destroySession({ commit }) {
			commit("storeUser", null);
			commit("clearConfig");
			cookieHelper.deleteSessionCookie();
		},
		setProfileId({ commit }, profileId) {
			commit("storeProfileId", profileId);
		},
		setGameConfig({ commit }, config) {
			commit("setGameConfig", config);
		},
		setGameMaster({ commit }, isMaster) {
			commit("setGameMaster", isMaster);
		},
		setCategories({ commit }, categories) {
			commit("setCategorie", categories);
		},
		setItems({ commit }, items) {
			commit("setItems", items);
		},
		setVotingProgress({ commit }, votingProgress) {
			commit("setVotingProgress", votingProgress);
		},
		setLastItemId({ commit }, itemId) {
			commit("setLastItemId", itemId);
		},
		setUsersInLobby({ commit }, users) {
			commit("setUsersInLobby", users);
		}
	}
});
