import { defineNuxtPlugin } from "#app";
import { useBooksStore } from "@/store/BooksStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const bookStore = useBooksStore(nuxtApp.$pinia);

  await bookStore.getBooksFromServ();
  await bookStore.getApprovedReviews();
});
