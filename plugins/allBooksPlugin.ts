import { defineNuxtPlugin } from "#app";
import { useBooksStore } from "@/store/BooksStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const bookStore = useBooksStore(nuxtApp.$pinia);

  try {
    await bookStore.getBooksFromServ();
    await bookStore.getApprovedReviews();
    await bookStore.getAllReviews();
    await bookStore.getContactData();
  } catch (error) {
    console.error("there was a problem");
  }
});
