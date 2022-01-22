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
    class="duration-500 transition-all dark:bg-gray-600 bg-gray-100 min-w-360px max-w-7xl min-h-screen mx-auto flex flex-col"
    :class="store.dir === 'rtl' ? 'font-vazir' : 'font-poppins'"
    :dir="store.dir"
  >
    <div class="min-h-[calc(100vh-50px)]">
      <TheHeader />
      <div v-if="store.user">
        <Loans class="mx-auto" />
      </div>
      <div v-else>
        <Login class=""></Login>
      </div>
    </div>
    <TheFooter class="w-full h-50px" />
  </div>
</template>
