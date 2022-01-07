<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Loans from "./components/Loans.vue";
import { store } from "./store";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { supabase } from "./helpers/supabase";
import Login from "./components/Login.vue";

store.user = supabase.auth.user();
supabase.auth.onAuthStateChange((_, session) => {
  store.user = session!.user;
  store.userSession = session;
});
</script>

<template>
  <div
    class="duration-500 transition-all dark:bg-gray-600 bg-gray-100 min-h-screen max-w-7xl mx-auto font-vazir"
    :dir="store.dir"
  >
    <div v-if="store.user">
      <TheHeader />
      <Loans class="mx-auto" />
      <TheFooter />
    </div>
    <div v-else class="pt-32">
      <Login></Login>
    </div>
  </div>
</template>
