<template>
  <div class="home">
    <div class="home__hero">
      <h1>Sandra Plum</h1>
      <div class="home__image-wrap" v-if="booksStore">
        <div
          v-for="book in booksStore.getBooks"
          :key="book.id"
          class="home__image-container"
        >
          <img :src="book.image" :alt="book.title" class="home__image-image" />
        </div>
      </div>
    </div>
    <section class="home__main">
      <div class="container">
        <About />
        <section class="authored">
          <h2>Books I've Written</h2>
          <div class="row justify-content-center" v-if="booksStore">
            <div
              v-for="book in booksStore.getBooks"
              :key="book.id"
              class="authored__books col-12 col-md-5"
            >
              <nuxt-link :to="`/books/${book.id}`" class="authored__books-wrap">
                <img
                  :src="book.image"
                  :alt="book.title"
                  class="authored__books-image"
                />
                <article class="authored__desc">
                  <p>{{ book.desc }}</p>
                </article>
              </nuxt-link>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="contact">
      <div class="container">
        <h2>Get In Touch</h2>
        <p>If you have any queries please get in touch using the form below</p>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-md-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useBooksStore } from "@/store/BooksStore";

import About from "@/components/about/About";
import ContactForm from "@/components/forms/ContactForm";

import "./home.scss";

export default {
  name: "Home",
  components: {
    About,
    ContactForm,
  },
  setup() {
    console.log("Set up");
    const booksStore = useBooksStore();

    return { booksStore };
  },
};
</script>
