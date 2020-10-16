import { configure, extend } from "vee-validate";
import {
	confirmed,
	email,
	max,
	max_value,
	min,
	min_value,
	numeric,
	required
} from "vee-validate/dist/rules";
import i18n from "../locales/validationDictionary";

configure({
	defaultMessage: (field, values) => {
		values._field_ = i18n.t(`fields.${field}`);
		return i18n.t(`validation.${values._rule_}`, values);
	}
});

extend("required", required);
extend("email", email);
extend("confirmed", confirmed);
extend("min", min);
extend("max", max);
extend("min_value", min_value);
extend("max_value", max_value);
extend("numeric", numeric);
