<template>
  <main>
    <!-- <div class="default__layout"> -->
    <NavComponent />
    <slot />
    <!-- </div> -->
  </main>
</template>

<script>
import NavComponent from "@/components/utility-components/NavComponent";
import { useBooksStore } from "@/store/BooksStore";

export default {
  components: {
    NavComponent,
  },
  watch: {
    $route(to, from) {
      console.log("route change to", to);
      console.log("route change from", from);

      if (from.name === "admin") {
        console.log("leaving admin");
        this.handleLogout();
      }
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

<style></style>
