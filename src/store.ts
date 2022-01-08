import { Session, User } from "@supabase/gotrue-js";
import { reactive } from "vue";

export const store = reactive({
  dir: localStorage.getItem('lang') ?? "rtl",
  user: {},
  userSession: null,
  loading: false,
} as { dir: 'rtl' | 'ltr', user: User | null, userSession: Session | null, loading: boolean});
