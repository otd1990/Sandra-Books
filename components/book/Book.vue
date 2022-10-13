<template>
  <section class="single-book">
    <div class="single-book__container">
      <div
        class="row justify-space-between align-items-center"
        v-if="singleBook"
      >
        <div class="col-12 col-md-3">
          <div class="single-book__quote">
            <p v-if="show">
              “<br />
              Lorem ipsum dolor sit, <br />amet consectetur adipisicing elit.
              <br />
              ”
            </p>
          </div>
        </div>
        <div class="col-12 col-md-9">
          <section class="single-book__main">
            <div class="single-book__image">
              <img
                :src="singleBook.image"
                :alt="singleBook.title"
                class="single-book--image h-100"
              />
            </div>
            <div class="single-book__info">
              <h1 class="single-book__title">{{ singleBook.title }}</h1>
              <p class="single-book__desc">{{ singleBook.desc }}</p>
              <div class="info__wrapper">
                <div class="info--title">
                  <h5>Published</h5>
                  <p>{{ singleBook.publishedDate }}</p>
                </div>
                <div class="info--title">
                  <h5>Price</h5>
                  <p>&pound;{{ singleBook.price }}</p>
                </div>
                <div class="info--title">
                  <h5>Extract</h5>
                  <p class="extract">{{ singleBook.extract }}</p>
                </div>
              </div>
            </div>
          </section>
          <div class="flex-end">
            <nuxt-link
              :to="`/buy/book/${singleBook.id}`"
              class="btn btn-primary btn--orange"
              >Buy Book</nuxt-link
            >
          </div>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </section>
</template>

<script>
import { useBooksStore } from "@/store/BooksStore";
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

export default {
  name: "Book",
  props: ["bookId"],
  setup(props) {
    const booksStore = useBooksStore();
    const { books } = storeToRefs(booksStore);
    let singleBook = ref(null);

    //https://www.thisdot.co/blog/vue-3-composition-api-watch-and-watcheffect
    watchEffect(() => {
      if (books.value !== undefined) {
        singleBook = books.value.find((book) => {
          return book.id === parseInt(props.bookId);
        });
        booksStore.setSingleBook(singleBook);
      }
    });

    return { books, singleBook };
  },
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
@import "../../assets/scss/variables.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.movein-enter-active,
.movein-leave-active {
  transition: all 0.5s ease;
}

.movein-enter-from,
.movein-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.info__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.extract {
  font-size: 0.9rem;
}

.single-book {
  padding: 2.75rem 0;
  background-color: $beigeMain;

  h1 {
    font-size: 4rem;
  }

  &__container {
    padding: 2rem 5rem;
    margin: 2rem;
    min-height: 675px;
  }

  &__quote {
    text-align: center;
    font-size: 2rem;
    font-style: italic;
  }

  &__main {
    display: flex;
    background: #fff;
  }

  &__desc {
    text-align: center;
    font-size: 0.9rem;
    margin: 1.5rem 0 2rem 0;
  }

  &__info {
    width: 100%;
    padding: 2rem;
  }

  &__title {
    text-align: center;
  }

  .info--title {
    &:not(:last-child) {
      margin-right: 2rem;
    }
    h5 {
      font-size: 0.9rem;
      color: #5b6c6f;
      font-weight: bold;
      letter-spacing: 1.25px;
      /* color: #949896; */
      /* color: #224543; */
      /* color: #C9AE99;*/
    }
  }

  &--image {
    max-width: 100%;
    object-fit: fill;
  }
}
</style>
