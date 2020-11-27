<template>
	<el-card class="box-card">
		<div slot="header" class="text-center my-4">
			<h3 class="home-header">
				{{ $t("home.JoinToRoom").toUpperCase() }}
			</h3>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center flex-column px-0 px-sm-3"
		>
			<div class="col-12 col-lg-6 d-flex flex-column  px-0">
				<ValidationObserver ref="form">
					<div class="form-group">
						<div
							class="d-flex flex-column align-items-center justify-content-center"
						>
							<div class="col-12">
								<ValidationProvider
									ref="roomCode"
									name="RoomCode"
									rules="required|min:6"
									v-slot="{ errors }"
								>
									<el-input
										:placeholder="$t('home.RoomCode')"
										v-model="roomCode"
										maxlength="6"
										:class="[{ 'is-invalid': errors[0] }]"
									>
										<i
											slot="prefix"
											class="el-input__icon el-icon-key"
										></i>
									</el-input>
									<small class="error-text">
										{{ errors[0] }}
									</small>
								</ValidationProvider>
							</div>
							<div class="col-12 mt-3">
								<ValidationProvider
									ref="nickname"
									name="Nickname"
									rules="required"
									v-slot="{ errors }"
								>
									<el-input
										:placeholder="$t('home.Nickname')"
										v-model="nickname"
										:class="[{ 'is-invalid': errors[0] }]"
									>
										<i
											slot="prefix"
											class="el-input__icon el-icon-user-solid"
										></i>
									</el-input>
									<small class="error-text">
										{{ errors[0] }}
									</small>
								</ValidationProvider>
							</div>
							<div class="col-12 flex-wrap d-flex flex-column">
								<el-button
									:disabled="loading"
									type="primary"
									icon="el-icon-switch-button"
									@click="joinToRoom"
									class="text-wrap mt-3 font-weight-bold"
									>{{ $t("home.Join") }}</el-button
								>
							</div>
						</div>
					</div>
				</ValidationObserver>
			</div>
			<h5 class="mb-2 grey" v-if="!isGuest">{{ $t("home.Or") }}</h5>
			<div
				class="col-12 col-lg-6 d-flex flex-column mb-2"
				v-if="!isGuest"
			>
				<el-button
					:disabled="loading"
					type="success"
					icon="el-icon-magic-stick"
					@click="createRoom"
					class="text-wrap mb-4 mt-2 font-weight-bold"
					>{{ $t("home.CreateRoom") }}</el-button
				>
			</div>
		</div>
	</el-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			roomCode: "",
			nickname: "",
			loading: false
		};
	},
	methods: {
		...mapActions(["setProfileId", "setGameConfig"]),
		async joinToRoom() {
			this.loading = true;
			const isValid = await this.$refs.form.validate();
			if (!this.$connection.connectionStarted) {
				this.$notify.info({
					title: "Info",
					message: this.$t("layout.Wait")
				});
			}
			if (isValid && this.$connection.connectionStarted) {
				await this.$connection.invoke(
					"ConnectToGame",
					this.roomCode.toUpperCase(),
					this.nickname
				);
				this.setGameConfig({
					code: this.roomCode.toUpperCase(),
					nickname: this.nickname,
					lastItemId: null
				});
				this.$gameHub.$on("profile-received", (id) => {
					this.setProfileId(id);
				});
				this.$router.push({
					name: "Lobby",
					params: {
						roomCode: this.roomCode
					}
				});
			}
			this.loading = false;
		},
		async createRoom() {
			this.$router.push({ name: "RoomCreate" });
		}
	},
	computed: {
		...mapGetters(["isGuest", "lastGameConfig"])
	},
	mounted() {
		this.roomCode = this.lastGameConfig.code;
		this.nickname = this.lastGameConfig.nickname;
	},
	watch: {
		lastGameConfig(newVal) {
			this.roomCode = newVal.code;
			this.nickname = newVal.nickname;
		}
	}
};
</script>
<style></style>
