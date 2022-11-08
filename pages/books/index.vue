<template>
  <div class="books__page">
    <div class="container">
      <h1>Books</h1>
      <Books />
    </div>
  </div>
</template>

<script>
import "./scss/booksPage.scss";
import Books from "@/components/books/Books";

export default {
  components: {
    Books,
    head() {
      return {
        title: "Sandra Plumb Books | Books",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
