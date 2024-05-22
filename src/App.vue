<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Loans from "./components/Loans.vue";
import { store } from "./store";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import { supabase } from "./helpers/supabase";
import Login from "./components/Login.vue";
import { onMounted } from "vue";

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      store.userSession = data.session as any;
      store.user = data.session!.user as any;
    } else {
      store.userSession = undefined;
      store.user = undefined;
    }
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    store.userSession = _session as any;
    store.user = _session!.user as any;
  })
})
</script>

<template>
  <div
    class="duration-500 transition-all dark:bg-gray-600 bg-gray-100 min-w-360px max-w-7xl min-h-screen mx-auto flex flex-col"
    :class="store.dir === 'rtl' ? 'font-vazir' : 'font-poppins'" :dir="store.dir">
    <div class="min-h-[calc(100vh-50px)]">
      <TheHeader />
      <div v-if="store.user?.id">
        <Loans class="mx-auto" />
      </div>
      <div v-else>
        <Login class=""></Login>
      </div>
    </div>
    <TheFooter class="w-full h-50px" />
  </div>
</template>
