<template>
  <div class="admin__layout">
    <NavComponent />
    <div class="main__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});
</script>

<script>
import NavComponent from "@/components/utility-components/NavComponent";
import { useBooksStore } from "@/store/BooksStore";

export default {
  components: {
    NavComponent,
  },
  setup() {
    const booksStore = useBooksStore();
    booksStore.getAllReviews();
  },
  watch: {
    $route(to, from) {
      console.log("route change to", to);
      console.log("route change from", from);

      const toName = to.name.split("-");
      const fromName = from.name.split("-");

      if (fromName.includes("admin") && toName.includes("admin")) {
        console.log("admin logged in");
        return;
      }

      // if (from.name === "admin") {
      console.log("leaving admin");
      this.handleLogout();
      // }
    },
  },
  methods: {
    async handleLogout() {
      console.log("Logging out");
      const supabase = useSupabaseClient();
      const booksStore = useBooksStore();

      try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
        booksStore.setUser(null);
        localStorage.removeItem("supabase.auth.token");
      } catch (error) {
        console.error("ERROR Signing out ", error);
      }
    },
  },
};
</script>
