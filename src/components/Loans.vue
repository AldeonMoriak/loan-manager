<script setup lang="ts">
import { ref, reactive } from "vue";
import Table from "./Table.vue";

const headers = ref(["نام وام", "موعد", "وضعیت", "مانده"]);
const rows = reactive([
  {
    name: "وام صادرات",
    total_amount: "۱۰۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۱۲,۷۵۰,۰۰۰",
    status: "بدهکار",
    remainder: "۸۴۱,۵۰۰,۰۰۰",
  },
  {
    name: "وام سپاه",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۳,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۹۵,۰۰۰,۰۰۰",
  },
  {
    name: "وام سپاه ۲",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۲,۵۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۷۱,۵۰۰,۰۰۰",
  },
  {
    name: "وام ازدواج",
    total_amount: "۵۰ میلیون",
    due_date: "۱۳م هر ماه",
    portion: "۶,۴۹۰,۰۰۰",
    status: "بدهکار",
    remainder: "۴۸۱,۵۰۰,۰۰۰",
  },
  {
    name: "بدهی به عادل",
    total_amount: "۱۰ میلیون",
    due_date: "آخر سال",
    portion: "۱۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۱۰۰,۰۰۰,۰۰۰",
  },
  {
    name: "بدهی به مرتضی",
    total_amount: "۲۰ میلیون",
    due_date: "هر زمان شد",
    portion: "۲۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۲۰۰,۰۰۰,۰۰۰",
  },
  {
    name: "بدهی به مادر",
    total_amount: "۷ میلیون",
    due_date: "هر وقت شد",
    portion: "۷۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۷۰,۰۰۰,۰۰۰",
  },
]);
</script>

<template>
  <div class="max-w-4xl pt-28">
    <Table :rows="rows" :headers="headers" class=""/>
  </div>
</template>
