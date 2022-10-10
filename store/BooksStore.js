import { defineStore } from "pinia";
// const supabase = useSupabaseClient();

export const useBooksStore = defineStore("BooksStore", {
  state: () => ({
    books: undefined,
  }),
  actions: {
    async getBooksFromServ(supabase) {
      try {
        let { data } = await supabase.from("books").select(`*`);
        this.books = data;
      } catch (error) {
        console.error("ERROR GETTING BOOKS ", error);
        return error;
      }
    },
  },
});
