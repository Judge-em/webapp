import requestSender from "../helpers/requestSender";

export default function(Vue) {
	Vue.item = {
		async createItem(item) {
			const result = await requestSender.send(
				{
					method: "post",
					url: "/items"
				},
				item
			);

			return result;
		}
	};

	Object.defineProperties(Vue.prototype, {
		$item: {
			get: () => Vue.item
		}
	});
}
