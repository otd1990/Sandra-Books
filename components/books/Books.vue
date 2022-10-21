<template>
  <div class="books">
    <div v-if="booksStore.books">
      <div
        v-for="(book, index) in booksStore.books"
        :key="book.id"
        class="book"
      >
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-5">
            <div class="book__image mb-4 mb-md-0">
              <img
                :src="book.image"
                :alt="book.title"
                :class="[index % 2 === 1 ? 'even' : 'odd']"
                v-if="show"
              />
            </div>
          </div>
          <div class="col-12 col-md-5">
            <h2>{{ book.title }}</h2>
            <p>{{ book.desc }}</p>
            <nuxt-link :to="`/books/${book.id}`">Read More</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script setup>
import { useBooksStore } from "@/store/BooksStore";

const booksStore = useBooksStore();
</script>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
  unmounted() {
    this.show = false;
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 3rem;
}

.imgtrans-enter-active,
.imgtrans-leave-active {
  transition: all 0.5s ease;
}

.imgtrans-enter-from,
.imgtrans-leave-to {
  opacity: 0.25;
  transform: translateY(25px);
}
</style>
