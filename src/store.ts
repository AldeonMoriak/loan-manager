import { reactive } from "vue";
import { LocalStore } from "./helpers/interfaces";

export const store = reactive({
	dir: localStorage.getItem('lang') ?? "ltr",
	user: undefined,
	userSession: undefined,
	loading: false,
} as LocalStore);
