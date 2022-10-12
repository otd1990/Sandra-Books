import { defineNuxtPlugin } from "#app";
import { useBooksStore } from "@/store/BooksStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("RUNNING MIDDLEWARE");
  const bookStore = useBooksStore(nuxtApp.$pinia);

  await bookStore.getBooksFromServ();
});
