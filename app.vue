<template>
  <!-- <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="user" />
    <Auth v-else />
    <Books />
  </div> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useBooksStore } from "@/store/BooksStore";
//todo add this to vuex
// const supabase = useSupabaseClient();
const booksStore = useBooksStore();

booksStore.getBooksFromServ();

// import Books from "./components/books/Books.vue";
// const user = useSupabaseUser();

// export default {
//   components: {
//     Books,
//   }
// }
</script>

<script>
// import Books from "./components/books/Books.vue";

// export default {
//   components: {
//     Books,
//   },
// };
</script>
