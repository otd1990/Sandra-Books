<template>
  <div class="home">
    <div class="home__hero" v-if="booksStore">
      <Swiper
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
        <SwiperSlide
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
        </SwiperSlide>
      </Swiper>
      <div class="home__overlay"></div>
    </div>
    <section class="home__main">
      <div class="container">
        <About />
        <section class="authored">
          <div class="row justify-content-center" v-if="booksStore">
            <h2 class="col-12">My Books</h2>
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

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";
@import "../../assets/scss/main.scss";

.home {
  &__hero {
    position: relative;
    overflow: hidden;
    background-color: $orangeMain;
    @include display-flex-column;
    height: 35vh;

    @media (min-width: $mobile-md) {
      height: 40vh;
    }

    @media (min-width: $mobile-lg) {
      height: 50vh;
    }

    @media (min-width: $tablet) {
      height: 60vh;
    }
    //1024px and above
    @media (min-width: $laptop) {
      height: 90vh;
    }

    .swiper {
      height: 100%;
      width: 100%;
    }

    &--image {
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 155%;
      @media (min-width: $laptop) {
        background-size: 100%;
      }
    }

    .swiper-pagination-bullet {
      background: transparent !important;
      border: 3px solid white !important;
      padding: 7px !important;
    }
    .swiper-pagination-bullet-active {
      background: white !important;
    }
  }

  .hero {
    &__book {
      max-width: 500px;
      overflow: hidden;
      margin: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &-container-title {
        text-align: center;
        background-color: #fff;
        transform: translateX(-100%);
        width: 80%;
        padding: 5px;
        @media (min-width: $mobile-md) {
          width: 68%;
        }
        @media (min-width: $tablet) {
          width: 100%;
        }
      }
      &-title {
        opacity: 0;
      }
      &-published {
        background: #000;
        color: #fff;
        padding: 10px;
        margin-top: -0.75rem;
        position: relative;
        opacity: 0;
        font-size: 1rem;
        @media (min-width: $mobile-lg) {
          font-size: 1.25rem;
          margin-top: -1rem;
          padding: 15px;
        }
        @media (min-width: $tablet) {
          font-size: 1.45rem;
        }
      }
    }
  }

  .home__hero .swiper-slide-active {
    .hero__book-container-title {
      animation: slideInBlock 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      .hero__book-title {
        opacity: 1;
        animation: fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        animation-delay: 0.65s;
      }
    }
    .hero__book-published {
      opacity: 1;
      animation: fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      animation-delay: 1.2s;
    }
  }

  @media (min-width: $laptop) {
    .swiper-slide-active.home__hero--image {
      animation: scaleImage 10s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  }

  @keyframes scaleImage {
    0% {
      background-size: 100%;
    }
    100% {
      background-size: 105%;
    }
  }

  @keyframes slideInBlock {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &__image-wrap {
    display: flex;
  }

  &__image-container {
    margin: 0.75rem;
  }

  &__image-image {
    filter: $shadow;
    max-width: 270px;
    height: 370px;
  }

  &__main {
    min-height: 60vh;
    background-color: $beigeMain;
    padding: 0 1rem;
    text-align: center;

    // @media (min-width: $laptop) {
    //   padding: 2rem 1rem;
    // }
  }
}

.about {
  margin-top: 0;
  .h1 {
    font-size: 3.5rem;
    @media (min-width: $mobile-sm) {
      font-size: 4rem;
    }
    // &::after {
    //   display: none;
    //   @media (min-width: 1023px) {
    //     display: block;
    //     left: -56.45%;
    //   }
    // }
  }
}

.authored {
  margin: $sectionSpacer;
  text-align: left;
  h2 {
    // text-align: center;
    margin: 2rem 0;
    position: relative;
    font-size: 3rem;
    @media (min-width: $mobile-sm) {
      font-size: 4rem;
    }
    // &::after {
    //   content: "";
    //   height: 3px;
    //   width: 7rem;
    //   background-color: $orangeMain;
    //   position: absolute;
    //   top: 50%;
    //   left: -25%;
    //   display: none;
    //   @media (min-width: 1023px) {
    //     display: block;
    //   }
    // }
  }
  &__books {
    &-wrap {
      text-decoration: none;
      color: $blackMain;
      &:hover {
        color: inherit;
      }
    }
    &-image {
      max-width: 100%;
      height: 375px;
      display: block;
      margin: 2rem auto;
      @media (min-width: $mobile-lg) {
        height: 450px;
      }
    }
  }
}

.contact {
  margin-top: 2rem;
  background-color: $orangeMain;
  text-align: center;
  position: relative;
  padding: 2rem 0 4rem 0;
  h2 {
    margin-bottom: 1.5rem;
    font-size: 3rem;
    @media (min-width: $mobile-sm) {
      font-size: 4rem;
    }
    @media (min-width: $tablet) {
      margin-top: -75px;
    }
  }

  form {
    text-align: left;
  }

  .form-group {
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }

  .form-control {
    border: none;
  }
}

@keyframes slideShow {
  0% {
    opacity: 0;
    transform: scale(1);
    -ms-transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0.75;
    transform: scale(1.1);
    -ms-transform: scale(1.1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
    -ms-transformm: scale(1);
  }
}
@-o-keyframes slideShow {
  0% {
    opacity: 0;
    -o-transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    -o-transform: scale(1.1);
  }
  100% {
    opacity: 0;
    -o-transformm: scale(1);
  }
}
@-moz-keyframes slideShow {
  0% {
    opacity: 0;
    -moz-transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    -moz-transform: scale(1.1);
  }
  100% {
    opacity: 0;
    -moz-transformm: scale(1);
  }
}
@-webkit-keyframes slideShow {
  0% {
    opacity: 0;
    -webkit-transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    -webkit-transform: scale(1.1);
  }
  100% {
    opacity: 0;
    -webkit-transformm: scale(1);
  }
}
</style>
