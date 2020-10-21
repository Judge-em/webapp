<template>
	<div
		class="col-12 d-flex flex-column justify-content-center align-items-center my-3 mb-4"
	>
		<h5 class="pb-2 grey">{{ $t("creator.EnterItems") }}</h5>
		<div class="col-12 d-flex flex-column">
			<div
				v-for="(item, index) in roomConfig.items"
				:key="index"
				class="d-flex flex-wrap align-items-center justify-content-center my-2"
			>
				<div class="col-12 col-sm-3">
					<el-input
						:placeholder="$t('creator.ItemName')"
						v-model="item.name"
						clearable
						class="mr-1"
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-4">
					<el-input
						:placeholder="$t('creator.ItemDescription')"
						v-model="item.description"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-3">
					<el-input
						:placeholder="$t('creator.ItemImage')"
						v-model="item.image"
						clearable
					>
						<i slot="prefix" class="el-input__icon el-icon-key"></i>
					</el-input>
				</div>
				<div class="col-12 col-sm-2">
					<el-button
						@click="removeItem(index)"
						type="danger"
						icon="el-icon-minus"
					></el-button>
					<el-button
						v-if="index === roomConfig.items.length - 1"
						@click="addNewItem"
						type="success"
						icon="el-icon-plus"
					></el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		roomConfig: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			roomName: ""
		};
	},
	methods: {
		removeItem(index) {
			this.roomConfig.items.splice(index, 1);
		},
		addNewItem() {
			this.roomConfig.items.push({
				name: "",
				description: "",
				image: ""
			});
		}
	}
};
</script>
