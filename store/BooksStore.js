import { defineStore } from "pinia";

export const useBooksStore = defineStore("BooksStore", {
  state: () => ({
    books: undefined,
    singleBook: undefined,
  }),
  getters: {
    getBooks: (state) => state.books,
  },
  actions: {
    async getBooksFromServ() {
      console.log("Getting books");
      const supabase = useSupabaseClient();
      try {
        let { data } = await supabase.from("books").select(`*`);
        this.books = data;
      } catch (error) {
        console.error("ERROR GETTING BOOKS ", error);
        return error;
      }
    },
    setSingleBook(book) {
      console.log("SINGLE BOOK SETTING ", book);
      this.singleBook = book;
    },
    persist: true,
  },
});
