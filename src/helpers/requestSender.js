import axios from "axios";

export default {
	async send(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params
			});
			return this.__responseWrapper(result);
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	async sendClear(config, data = null) {
		try {
			const result = await axios({
				method: config.method,
				url: config.url,
				data,
				params: config.params,
				responseType: "blob"
			});
			return result;
		} catch (error) {
			return this.__responseWrapper(error, false);
		}
	},
	__responseWrapper(result, status = true) {
		const wrappedResponse = {
			status: result.data.status
		};
		if (status) {
			wrappedResponse.data = result.data.data;
			Object.assign(
				wrappedResponse,
				result.data.count ? { count: result.data.count } : null,
				result.data.page ? { page: result.data.page } : null
			);
		} else {
			wrappedResponse.errors = {
				statusCode: result.status,
				messages: result.data.errors,
				message: result.data.message
			};
		}
		return wrappedResponse;
	}
};
