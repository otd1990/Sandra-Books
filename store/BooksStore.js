import { defineStore } from "pinia";

export const useBooksStore = defineStore("BooksStore", {
  state: () => ({
    books: undefined,
    singleBook: undefined,
    user: null,
    approvedReviews: undefined,
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
    async getApprovedReviews() {
      const supabase = useSupabaseClient();
      try {
        const resp = await supabase
          .from("reviews")
          .select()
          .is("approved", true);

        console.log("RESPONSE ", resp);

        if (resp.error) throw error;

        this.approvedReviews = resp.data;
      } catch (error) {
        console.error("ERROR GETTING REVIEWS ", error);
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
