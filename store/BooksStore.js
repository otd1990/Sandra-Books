import { defineStore } from "pinia";

export const useBooksStore = defineStore("BooksStore", {
  state: () => ({
    books: undefined,
    singleBook: undefined,
    user: null,
    approvedReviews: undefined,
    reviews: undefined,
    contactData: undefined,
    illustrations: undefined,
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
    async getIllustrations() {
      console.log("Getting illustrations");
      const supabase = useSupabaseClient();
      try {
        const resp = await supabase.storage.from("illustrations").list();

        console.log("Data ", resp);

        if (resp.error) throw resp.error;
        this.illustrations = resp.data;
      } catch (error) {
        console.error("Error getting images ", error);
      }

      console.log("IMAGES ", this.illustrations);

      return this.illustrations;
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
        console.error("ERROR GETTING Approved REVIEWS ", error);
      }
    },
    async getAllReviews() {
      const supabase = useSupabaseClient();
      try {
        const resp = await supabase.from("reviews").select();

        console.log("RESPONSE ", resp);

        if (resp.error) throw error;

        this.reviews = resp.data;
      } catch (error) {
        console.error("ERROR GETTING All REVIEWS ", error);
      }
    },
    async getContactData() {
      const supabase = useSupabaseClient();
      try {
        const resp = await supabase.from("contact").select();

        console.log("CONSTACT RESP ", resp);

        if (resp.error) throw error;

        this.contactData = resp.data;
      } catch (error) {
        console.error("Error getting contact data ", error);
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
