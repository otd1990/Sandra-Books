<template>
  <div class="books">
    <p>
      These tales from the Broadleaf Wood trilogy are a lovely collection of
      sensitive stories, written in rhyme and perfect to read out loud.
      Educational and enchanting, interwoven with exciting and sometimes
      touching drama.
    </p>
    <p>The final book in the Broadleaf trilogy will be published in 2023.</p>
    <div v-if="booksStore.books">
      <div
        v-for="(book, index) in booksStore.books"
        :key="book.id"
        class="book"
      >
        <div class="row justify-content-center">
          <div class="col-12 col-md-6">
            <div class="book__image mb-4 mb-md-0">
              <img :src="book.image" :alt="book.title" class="even" />
            </div>
          </div>
          <div class="col-12 col-md-6">
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
  margin: 3rem 0;
}
</style>
