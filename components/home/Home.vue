<template>
  <div class="home">
    <div class="home__hero" v-if="booksStore">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{ clickable: true }"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide
          v-for="(book, index) in allBooks"
          :key="book.id"
          :index="index"
          :virtualIndex="index"
          class="home__hero--image"
          :style="`background-image: url('${book.bannerImg}')`"
        >
          <div class="hero__book">
            <div class="hero__book-container-title">
              <h1 class="hero__book-title">{{ book.title }}</h1>
            </div>
            <p class="hero__book-published">
              Available From:
              {{ new Date(book.publishedDate).toLocaleDateString("en-GB") }}
            </p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="home__overlay"></div>
    </div>
    <section class="home__main">
      <div class="container -lg">
        <About />
        <section class="authored">
          <div class="row justify-content-center" v-if="booksStore">
            <h2 class="col-12">My Books</h2>
            <div class="col-12">
              <p>
                These tales from the Broadleaf Wood trilogy are a lovely
                collection of sensitive stories, written in rhyme and perfect to
                read out loud. Educational and enchanting, interwoven with
                exciting and sometimes touching drama.
              </p>
              <p>
                The final book in the Broadleaf trilogy will be published in
                2023.
              </p>
            </div>
            <div
              v-for="book in allBooks"
              :key="book.id"
              class="authored__books col-12 col-md-6"
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
    <section id="contact-section" class="contact">
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

// Import Swiper Vue.js components
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
  name: "Home",
  components: {
    About,
    ContactForm,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const booksStore = useBooksStore();
    const allBooks = booksStore.getBooks.filter((book) => book.showOnHomePage);

    return { allBooks, booksStore, modules: [Pagination, Autoplay] };
  },
};
</script>

<style lang="scss" src="./scss/home.scss" />
<style src="swiper/css" />
<style src="swiper/css/pagination" />
<style src="swiper/css/autoplay" />
