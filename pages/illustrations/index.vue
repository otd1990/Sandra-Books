<template>
  <div class="container text-center page-top-padding">
    <h1 class="my-2">Images</h1>
    <section class="grid">
      <!-- <div
        class="grid__container skeletor"
        :class="loading ? 'loading' : 'loaded'"
      ></div> -->
      <div class="grid__container">
        <Skeletor
          v-if="loading"
          v-for="i in 12"
          :key="i"
          height="331"
          width="331"
        />
        <figure
          v-else
          v-for="(illustration, index) in illustrations"
          :key="index"
        >
          <img
            :src="`https://ryjvicejickwdbxrtvmp.supabase.co/storage/v1/object/public/illustrations/${illustration.name}`"
            :alt="illustration.name"
          />
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import { useBooksStore } from "@/store/BooksStore";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

export default {
  async setup() {
    const bookStore = useBooksStore();
    const loading = ref(true);

    const illustrations = bookStore.illustrations
      ? bookStore.illustrations
      : await bookStore.getIllustrations();

    setTimeout(() => {
      loading.value = false;
    }, 4500);

    return { loading, illustrations };
  },
  components: {
    Skeletor,
  },
  head() {
    return {
      title: "Sandra Plumb Books | Illustrations",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";

.container {
  margin: 0 auto;
}
.grid {
  margin: 2rem 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  &__container {
    max-width: 1024px;
    display: grid;
    grid-template-columns: 100%;
    grid-column-gap: 0.5rem;
    grid-gap: 0.5rem;
    padding: 1rem;
    @media (min-width: $mobile-lg) {
      grid-template-columns: 50% 50%;
    }
    @media (min-width: $tablet) {
      grid-template-columns: 33.333% 33.333% 33.333%;
    }

    figure {
      height: 270px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .skeletor {
    &.loaded {
      animation: fadeOut 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }

    span {
      margin: 5px;
      padding: 5px;
      display: block;
    }
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
    z-index: -1;
  }
}
</style>
