<template>
	<div class="d-flex vh-100">
		<navbar v-if="showNavbar" class="navbar-overlay"></navbar>
		<div
			:style="{ paddingLeft: showNavbar && !isSmallScreen ? '64px' : '' }"
			class=" view-overlay vw-100 vh-100"
		>
			<router-view />
		</div>
	</div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import mediaQuery from "./mixins/mediaQuery";
import messageTypes from "./helpers/dictionaries/messageTypes";
import localStorageHelper from "./helpers/localStorageHelper";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		Navbar
	},
	data() {
		return {
			routesWithoutMenu: ["Login"]
		};
	},
	mixins: [mediaQuery],
	methods: {
		...mapActions([
			"setGameConfig",
			"setCategories",
			"setItems",
			"setGameMaster",
			"setVotingProgress",
			"setLastItemId",
			"setUsersInLobby",
			"setProfileId"
		])
	},
	computed: {
		...mapGetters(["user", "lastGameConfig", "isMaster", "items"]),
		showNavbar() {
			return !this.routesWithoutMenu.includes(this.$route.name);
		}
	},
	created() {
		this.$gameHub.$on("message-received", (message) => {
			if (messageTypes[message.type] === "error")
				this.$router.push({ name: "Home" });
			this.$notify[messageTypes[message.type]]({
				title: message.content
			});
		});
		this.$gameHub.$on("master-id-received", () => {
			this.setGameMaster(true);
		});
		this.$gameHub.$on("categories-received", (categories) => {
			this.setCategories(categories);
		});
		this.$gameHub.$on("items-received", (items) => {
			this.setItems(items);
		});
		this.$gameHub.$on("player-list-received", (list) => {
			this.setUsersInLobby(list);
		});
		this.$gameHub.$on("master-requested", (gameCode) => {
			if (this.lastGameConfig.lastItemId)
				this.$connection.invoke(
					"SynchronizeCurrentItem",
					gameCode,
					this.lastGameConfig.lastItemId
				);
		});
		this.$gameHub.$on("profile-received", (id) => {
			this.setProfileId(id);
		});
		this.$gameHub.$on(
			"voting-progress-received",
			(votingCounter, maxVotes) => {
				this.setVotingProgress({ maxVotes, votingCounter });
				if (this.isMaster && votingCounter >= maxVotes) {
					const index = this.items.findIndex(
						(item) => item.id === this.lastGameConfig.lastItemId
					);
					if (this.items[index + 1]) {
						this.$connection.invoke(
							"PushItemId",
							this.lastGameConfig.code,
							this.items[index + 1].id
						);
					} else {
						this.$connection.invoke(
							"FinishGame",
							this.lastGameConfig.code
						);
					}
				}
			}
		);

		this.$gameHub.$on("current-item-received", (id) => {
			this.setLastItemId(id);
			if (this.$route.name !== "Room")
				this.$router.push({ name: "Room" });
		});
	},
	watch: {
		user(newVal) {
			if (newVal === null) {
				this.$notify.info({
					title: "Info",
					message: this.$t("layout.LoggedOut")
				});
				this.$router.push({ name: "Login" });
			}
		},
		lastGameConfig(newVal) {
			localStorageHelper.storeInStorage("lastGame", newVal);
		}
	}
};
</script>
