<template>
  <div class="admin__layout">
    <NavComponent />
    <div class="main__content">
      <slot />
    </div>
  </div>
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

      const toName = to.name.split("-");
      const fromName = from.name.split("-");

      console.log("TO NAME ", toName);
      console.log("From name ", fromName);

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
