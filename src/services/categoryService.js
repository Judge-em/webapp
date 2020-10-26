import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.category = {
		async createCategories(categories) {
			const result = await requestSender.send(
				{
					method: "post",
					url: "/categories"
				},
				categories
			);

			return result;
		},
		async updateCategories(updatedCategories) {
			const result = await requestSender.send(
				{
					method: "put",
					url: "/categories"
				},
				updatedCategories
			);

			return result;
		},
		async getCategories(gameId) {
			const result = await requestSender.send({
				method: "get",
				url: `/categories/${gameId}`
			});
			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$category: {
			get: () => Vue.category
		}
	});
}
