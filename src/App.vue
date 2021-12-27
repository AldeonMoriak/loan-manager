<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Loans from "./components/Loans.vue";
import { store } from "./store";
import AddTransaction from "./components/AddTransaction.vue";

</script>

<template>
  <div class="bg-amber-200 min-h-screen max-w-7xl mx-auto font-vazir" :dir="store.dir">
    <Loans class="mx-auto" />
  </div>
</template>
