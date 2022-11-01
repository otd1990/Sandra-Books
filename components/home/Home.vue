<template>
  <div class="home">
    <div class="home__hero" v-if="booksStore">
      <div
        class="home__hero--image"
        v-for="(book, index) in allBooks"
        :key="book.id"
        :style="animationCalc(book, index)"
      ></div>
    </div>
    <section class="home__main">
      <div class="container">
        <About />
        <section class="authored">
          <h2>Books I've Written</h2>
          <div class="row justify-content-center" v-if="booksStore">
            <div
              v-for="book in allBooks"
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
    const booksStore = useBooksStore();
    const allBooks = booksStore.getBooks.filter((book) => book.showOnHomePage);

    return { allBooks, booksStore };
  },
  methods: {
    animationCalc(book, index) {
      // const banners = document.querySelectorAll('.home__banner--wrap');

      console.log("ALL BOOKS ", this.allBooks);
      const num = window.matchMedia("(min-width: 768px)").matches ? 6 : 4;

      return `background-image: url('${book.image}'); animation-delay: ${
        index * num
      }s; -webkit-animation-delay: ${index * num}s; animation-duration: ${
        this.allBooks.length * num
      }s; -webkit-animation-duration: ${this.allBooks.length * num}s`;

      // banners.forEach((banner, i) => {
      //     //work out the animation duration, smaller the value of num the quicker the transition
      //     const num = window.matchMedia("(min-width: 768px)").matches ? 6 : 4;
      //     const duration = banners.length * num;
      //     //set the delay and the duration for the animation
      //     banner.setAttribute(`style`, `animation-delay: ${ i * num }s; -webkit-animation-delay: ${ i * num }s; animation-duration: ${ duration }s; -webkit-animation-duration: ${ duration }s;`);
      //     //orders.push(banner.dataset.order);
      // });
    },
  },
};
</script>
