import { Session, User } from "@supabase/gotrue-js";
import { reactive } from "vue";

export const store = reactive({
  dir: "rtl",
  user: {},
  userSession: null,
} as { dir: 'rtl' | 'ltr', user: User | null, userSession: Session | null});
