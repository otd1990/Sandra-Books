<template>
  <div class="admin__layout">
    <NavComponent />
    <div class="main__content">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<script>
import NavComponent from "@/components/utility-components/NavComponent";
import { useBooksStore } from "@/store/BooksStore";

export default {
  components: {
    NavComponent,
  },
  watch: {
    $route(to, from) {
      const toName = to.name.split("-");
      const fromName = from.name.split("-");

      if (fromName.includes("admin") && toName.includes("admin")) {
        return;
      }

      this.handleLogout();
    },
  },
  methods: {
    async handleLogout() {
      await useLogOut();
    },
  },
};
</script>
