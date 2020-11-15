export default {
	getFromStorage: (name) =>
		JSON.parse(localStorage[`${window.location.origin}+${name}`]),

	storeInStorage: (name, value) =>
		(localStorage[`${window.location.origin}+${name}`] = JSON.stringify(
			value
		)),

	isStored: (name) => !!localStorage[`${window.location.origin}+${name}`],

	removeFromStorage: (name) => {
		localStorage.removeItem(`${window.location.origin}+${name}`);
	}
};
