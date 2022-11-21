<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useBooksStore } from "@/store/BooksStore";
//todo add this to vuex
const booksStore = useBooksStore();

booksStore.getBooksFromServ();
</script>
