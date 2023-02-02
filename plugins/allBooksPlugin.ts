import { defineNuxtPlugin } from "#app";
import { useBooksStore } from "@/store/BooksStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const bookStore = useBooksStore(nuxtApp.$pinia);
  console.log("all books plugin");
  await bookStore.getBooksFromServ();
  await bookStore.getApprovedReviews();
});
