import { defineStore } from "pinia";

export const useBooksStore = defineStore("BooksStore", {
  state: () => ({
    books: undefined,
    singleBook: undefined,
    user: null,
  }),
  getters: {
    getBooks: (state) => state.books,
  },
  actions: {
    async getBooksFromServ() {
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
      this.singleBook = book;
    },
    setUser(user) {
      this.user = user;
    },
    persist: true,
  },
});
