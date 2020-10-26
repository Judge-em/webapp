import Vue from "vue";
import Vuex from "vuex";
import cookieHelper from "../helpers/cookieHelper";
import parseJwt from "../helpers/parseJwt";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: null
	},
	getters: {
		user: (state) => state.user
	},
	mutations: {
		storeUser(state, user) {
			state.user = user;
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
				}
			}
		}
	}
});
