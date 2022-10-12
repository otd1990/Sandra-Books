<template>
  <div class="books">
    <div v-if="booksStore.books">
      <div v-for="book in booksStore.books" :key="book.id" class="book">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-5">
            <div class="book__image">
              <img :src="book.image" :alt="book.title" />
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

<style lang="scss" scoped>
h2 {
  font-size: 3rem;
}
</style>
